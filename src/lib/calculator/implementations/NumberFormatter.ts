import type { Formatter } from '../interfaces/Formatter';

/**
 * 포맷팅 옵션 인터페이스
 */
interface FormatOptions {
    thousandsSeparator?: boolean;
    decimalPlaces?: number;
    removeTrailingZeros?: boolean;
}

/**
 * 숫자 포매터 구현
 *
 * @remarks
 * TDD 원칙에 따라 개발됨. 숫자를 다양한 형식으로 포매팅하고,
 * 포매팅된 문자열을 다시 숫자로 파싱하는 기능을 제공합니다.
 *
 * @example
 * ```typescript
 * const formatter = new NumberFormatter();
 * formatter.format(1234567); // returns "1,234,567"
 * formatter.format(3.14159, { decimalPlaces: 2 }); // returns "3.14"
 * ```
 */
export class NumberFormatter implements Formatter {
    /**
     * 과학적 표기법 사용 임계값
     */
    private static readonly SCIENTIFIC_NOTATION_THRESHOLD_UPPER = 1e15;
    private static readonly SCIENTIFIC_NOTATION_THRESHOLD_LOWER = 1e-10;

    /**
     * 기본 포맷팅 옵션
     */
    private static readonly DEFAULT_OPTIONS: Required<FormatOptions> = {
        thousandsSeparator: true,
        decimalPlaces: 10,
        removeTrailingZeros: true,
    };

    /**
     * 숫자를 포맷팅하여 문자열로 반환
     *
     * @param value - 포매팅할 숫자
     * @param options - 포매팅 옵션
     * @returns 포매팅된 문자열
     *
     * @example
     * ```typescript
     * format(1234567); // "1,234,567"
     * format(3.14159, { decimalPlaces: 2 }); // "3.14"
     * format(5.0, { removeTrailingZeros: true }); // "5"
     * ```
     */
    format(value: number, options: FormatOptions = {}): string {
        // 특수 케이스 처리
        if (Number.isNaN(value)) {
            return 'NaN';
        }

        if (!Number.isFinite(value)) {
            return value > 0 ? 'Infinity' : '-Infinity';
        }

        // -0 처리
        if (Object.is(value, -0)) {
            return '0';
        }

        // 옵션 병합
        const mergedOptions: Required<FormatOptions> = {
            ...NumberFormatter.DEFAULT_OPTIONS,
            ...options,
        };

        // 과학적 표기법 필요 여부 확인
        const absValue = Math.abs(value);
        if (
            absValue !== 0 &&
            (absValue >= NumberFormatter.SCIENTIFIC_NOTATION_THRESHOLD_UPPER ||
                absValue < NumberFormatter.SCIENTIFIC_NOTATION_THRESHOLD_LOWER)
        ) {
            return this.formatScientific(value, mergedOptions);
        }

        return this.formatStandard(value, mergedOptions);
    }

    /**
     * 표준 형식으로 포맷팅
     */
    private formatStandard(value: number, options: Required<FormatOptions>): string {
        let formatted: string;

        // 소수점 자릿수 적용
        if (options.decimalPlaces !== undefined) {
            formatted = value.toFixed(options.decimalPlaces);
        } else {
            formatted = value.toString();
        }

        // 후행 0 제거
        if (options.removeTrailingZeros && formatted.includes('.')) {
            formatted = formatted.replace(/\.?0+$/, '');
        }

        // 천 단위 구분자 적용
        if (options.thousandsSeparator) {
            formatted = this.addThousandsSeparator(formatted);
        }

        return formatted;
    }

    /**
     * 과학적 표기법으로 포맷팅
     */
    private formatScientific(value: number, options: Required<FormatOptions>): string {
        const exponential = value.toExponential(options.decimalPlaces);

        if (options.removeTrailingZeros) {
            // 지수 부분 분리
            const [mantissa, exponent] = exponential.split('e');
            const cleanMantissa = mantissa.replace(/\.?0+$/, '');
            return `${cleanMantissa}e${exponent}`;
        }

        return exponential;
    }

    /**
     * 천 단위 구분자 추가
     */
    private addThousandsSeparator(numStr: string): string {
        const parts = numStr.split('.');
        const integerPart = parts[0];
        const decimalPart = parts[1];

        // 정수 부분에 천 단위 구분자 추가
        const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        return decimalPart !== undefined ? `${formattedInteger}.${decimalPart}` : formattedInteger;
    }

    /**
     * 포매팅된 문자열을 숫자로 파싱
     *
     * @param formatted - 포매팅된 문자열
     * @returns 파싱된 숫자
     *
     * @example
     * ```typescript
     * parse("1,234,567"); // 1234567
     * parse("-3.14"); // -3.14
     * ```
     */
    parse(formatted: string): number {
        // 천 단위 구분자 제거
        const cleaned = formatted.replace(/,/g, '');
        return parseFloat(cleaned);
    }
}

/**
 * 숫자 포맷팅을 위한 헬퍼 함수
 *
 * @param value - 포매팅할 숫자
 * @param options - 포매팅 옵션
 * @returns 포매팅된 문자열
 *
 * @remarks
 * 이 함수는 NumberFormatter 인스턴스를 생성하고 format을 호출하는
 * 편의 함수입니다. 간단한 사용 시 유용합니다.
 *
 * @example
 * ```typescript
 * formatNumber(1234567); // "1,234,567"
 * formatNumber(3.14159, { decimalPlaces: 2 }); // "3.14"
 * ```
 */
export const formatNumber = (value: number, options: FormatOptions = {}): string => {
    const formatter = new NumberFormatter();
    return formatter.format(value, options);
};
