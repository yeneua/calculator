import type { IUnitConverter, UnitCategory } from '../interfaces/UnitConverter';
import { UNIT_CATEGORIES, findUnitCategory, ALL_CATEGORIES } from '../units';

/**
 * Math.js 기반 단위 변환기 구현
 *
 * @remarks
 * TDD 원칙에 따라 개발됨. 다양한 물리 단위 간의 변환을 지원합니다.
 * 온도 변환은 특수 공식을 사용하고, 나머지 단위는 비율 기반 변환을 사용합니다.
 *
 * @example
 * ```typescript
 * const converter = new UnitConverter();
 * converter.convert(100, 'meter', 'feet'); // returns 328.084
 * converter.convert(0, 'celsius', 'fahrenheit'); // returns 32
 * ```
 */
export class UnitConverter implements IUnitConverter {
    /**
     * 단위 변환 수행
     *
     * @param value - 변환할 값
     * @param fromUnit - 원본 단위
     * @param toUnit - 대상 단위
     * @returns 변환된 값
     * @throws {Error} 잘못된 단위 또는 호환되지 않는 단위
     */
    convert(value: number, fromUnit: string, toUnit: string): number {
        // 동일 단위인 경우
        if (fromUnit === toUnit) {
            return value;
        }

        // 원본 단위 카테고리 확인
        const fromCategory = findUnitCategory(fromUnit);
        if (!fromCategory) {
            throw new Error(`Invalid source unit: ${fromUnit}`);
        }

        // 대상 단위 카테고리 확인
        const toCategory = findUnitCategory(toUnit);
        if (!toCategory) {
            throw new Error(`Invalid target unit: ${toUnit}`);
        }

        // 카테고리 호환성 확인
        if (fromCategory !== toCategory) {
            throw new Error(
                `Incompatible units: cannot convert ${fromUnit} (${fromCategory}) to ${toUnit} (${toCategory})`
            );
        }

        // 온도는 특수 처리
        if (fromCategory === 'temperature') {
            return this.convertTemperature(value, fromUnit, toUnit);
        }

        // 비율 기반 변환
        return this.convertByRatio(value, fromUnit, toUnit, fromCategory);
    }

    /**
     * 비율 기반 단위 변환
     * 원본 → 기본 단위 → 대상 단위
     */
    private convertByRatio(
        value: number,
        fromUnit: string,
        toUnit: string,
        category: UnitCategory
    ): number {
        const units = UNIT_CATEGORIES[category];

        const fromRatio = units[fromUnit];
        const toRatio = units[toUnit];

        if (fromRatio === undefined || toRatio === undefined) {
            throw new Error(`Unit not found in category ${category}`);
        }

        // 원본 → 기본 단위 → 대상 단위
        const baseValue = value * fromRatio;
        return baseValue / toRatio;
    }

    /**
     * 온도 변환 (특수 공식 사용)
     */
    private convertTemperature(value: number, fromUnit: string, toUnit: string): number {
        // 먼저 섭씨로 변환
        let celsius: number;

        switch (fromUnit) {
            case 'celsius':
                celsius = value;
                break;
            case 'fahrenheit':
                celsius = (value - 32) * (5 / 9);
                break;
            case 'kelvin':
                celsius = value - 273.15;
                break;
            default:
                throw new Error(`Unknown temperature unit: ${fromUnit}`);
        }

        // 섭씨에서 대상 단위로 변환
        switch (toUnit) {
            case 'celsius':
                return celsius;
            case 'fahrenheit':
                return celsius * (9 / 5) + 32;
            case 'kelvin':
                return celsius + 273.15;
            default:
                throw new Error(`Unknown temperature unit: ${toUnit}`);
        }
    }

    /**
     * 카테고리에 속한 단위 목록 반환
     *
     * @param category - 단위 카테고리
     * @returns 해당 카테고리의 단위 목록
     */
    getUnitsForCategory(category: UnitCategory): string[] {
        if (category === 'temperature') {
            return ['celsius', 'fahrenheit', 'kelvin'];
        }

        const units = UNIT_CATEGORIES[category];
        if (!units) {
            return [];
        }

        return Object.keys(units);
    }

    /**
     * 모든 카테고리 목록 반환
     *
     * @returns 카테고리 목록
     */
    getCategories(): UnitCategory[] {
        return [...ALL_CATEGORIES];
    }
}

/**
 * 단위 변환을 위한 헬퍼 함수
 *
 * @param value - 변환할 값
 * @param fromUnit - 원본 단위
 * @param toUnit - 대상 단위
 * @returns 변환된 값
 *
 * @example
 * ```typescript
 * convert(100, 'meter', 'feet'); // 328.084
 * convert(0, 'celsius', 'fahrenheit'); // 32
 * ```
 */
export const convert = (value: number, fromUnit: string, toUnit: string): number => {
    const converter = new UnitConverter();
    return converter.convert(value, fromUnit, toUnit);
};
