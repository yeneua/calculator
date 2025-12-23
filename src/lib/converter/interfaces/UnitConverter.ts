/**
 * 단위 카테고리 타입
 */
export type UnitCategory = 'length' | 'mass' | 'temperature' | 'time' | 'volume' | 'area';

/**
 * 단위 변환기 인터페이스
 * SOLID 원칙: Single Responsibility - 단위 변환만 담당
 */
export interface IUnitConverter {
    /**
     * 단위 변환 수행
     * @param value - 변환할 값
     * @param fromUnit - 원본 단위
     * @param toUnit - 대상 단위
     * @returns 변환된 값
     * @throws Error - 잘못된 단위 또는 호환되지 않는 단위
     */
    convert(value: number, fromUnit: string, toUnit: string): number;

    /**
     * 카테고리에 속한 단위 목록 반환
     * @param category - 단위 카테고리
     * @returns 해당 카테고리의 단위 목록
     */
    getUnitsForCategory(category: UnitCategory): string[];

    /**
     * 모든 카테고리 목록 반환
     * @returns 카테고리 목록
     */
    getCategories(): UnitCategory[];
}
