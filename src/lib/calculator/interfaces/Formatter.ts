/**
 * 숫자 포매터 인터페이스
 * SOLID 원칙: Single Responsibility - 숫자 포매팅만 담당
 */
export interface Formatter {
    /**
     * 숫자를 포맷팅하여 문자열로 반환
     * @param value - 포매팅할 숫자
     * @param options - 포매팅 옵션
     * @returns 포매팅된 문자열
     */
    format(
        value: number,
        options?: {
            thousandsSeparator?: boolean;
            decimalPlaces?: number;
            removeTrailingZeros?: boolean;
        }
    ): string;

    /**
     * 포매팅된 문자열을 숫자로 파싱
     * @param formatted - 포매팅된 문자열
     * @returns 파싱된 숫자
     */
    parse(formatted: string): number;
}
