import type { UnitCategory } from '../interfaces/UnitConverter';

/**
 * 단위 정의
 * 각 카테고리별 단위와 기본 단위(base unit) 대비 변환 비율
 */

/**
 * 길이 단위 정의
 * 기본 단위: meter
 */
export const LENGTH_UNITS: Record<string, number> = {
    meter: 1,
    kilometer: 1000,
    centimeter: 0.01,
    millimeter: 0.001,
    mile: 1609.344,
    yard: 0.9144,
    feet: 0.3048,
    inch: 0.0254,
};

/**
 * 질량 단위 정의
 * 기본 단위: kilogram
 */
export const MASS_UNITS: Record<string, number> = {
    kilogram: 1,
    gram: 0.001,
    milligram: 0.000001,
    ton: 1000, // metric ton
    pound: 0.453592,
    ounce: 0.0283495,
};

/**
 * 시간 단위 정의
 * 기본 단위: second
 */
export const TIME_UNITS: Record<string, number> = {
    second: 1,
    millisecond: 0.001,
    minute: 60,
    hour: 3600,
    day: 86400,
    week: 604800,
    month: 2629800, // 평균 (30.44일)
    year: 31557600, // 평균 (365.25일)
};

/**
 * 부피 단위 정의
 * 기본 단위: liter
 */
export const VOLUME_UNITS: Record<string, number> = {
    liter: 1,
    milliliter: 0.001,
    cubicMeter: 1000,
    gallon: 3.78541, // US gallon
    quart: 0.946353, // US quart
    pint: 0.473176, // US pint
    cup: 0.236588, // US cup
    fluidOunce: 0.0295735, // US fluid ounce
};

/**
 * 면적 단위 정의
 * 기본 단위: squareMeter
 */
export const AREA_UNITS: Record<string, number> = {
    squareMeter: 1,
    squareKilometer: 1000000,
    squareCentimeter: 0.0001,
    squareFoot: 0.092903,
    squareInch: 0.00064516,
    squareMile: 2589988.11,
    hectare: 10000,
    acre: 4046.86,
};

/**
 * 카테고리별 단위 맵
 */
export const UNIT_CATEGORIES: Record<UnitCategory, Record<string, number>> = {
    length: LENGTH_UNITS,
    mass: MASS_UNITS,
    time: TIME_UNITS,
    volume: VOLUME_UNITS,
    area: AREA_UNITS,
    temperature: {}, // 온도는 특수 처리
};

/**
 * 단위가 속한 카테고리 찾기
 */
export function findUnitCategory(unit: string): UnitCategory | null {
    // 온도 단위 체크
    if (['celsius', 'fahrenheit', 'kelvin'].includes(unit)) {
        return 'temperature';
    }

    for (const [category, units] of Object.entries(UNIT_CATEGORIES)) {
        if (unit in units) {
            return category as UnitCategory;
        }
    }
    return null;
}

/**
 * 모든 카테고리 목록
 */
export const ALL_CATEGORIES: UnitCategory[] = [
    'length',
    'mass',
    'temperature',
    'time',
    'volume',
    'area',
];
