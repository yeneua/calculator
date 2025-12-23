import { describe, it, expect } from 'vitest';
import { UnitConverter, convert } from '@/lib/converter/implementations/MathJsConverter';

/**
 * 단위 변환 엔진 테스트
 * TDD: RED 단계 - 먼저 테스트 작성
 *
 * 관련 FR: FR-18, FR-19, FR-20
 */

describe('UnitConverter', () => {
    const converter = new UnitConverter();

    describe('길이 변환 (Length)', () => {
        it('should convert meters to feet', () => {
            expect(convert(100, 'meter', 'feet')).toBeCloseTo(328.084, 2);
        });

        it('should convert feet to meters', () => {
            expect(convert(328.084, 'feet', 'meter')).toBeCloseTo(100, 1);
        });

        it('should convert kilometers to miles', () => {
            expect(convert(1, 'kilometer', 'mile')).toBeCloseTo(0.621371, 4);
        });

        it('should convert miles to kilometers', () => {
            expect(convert(1, 'mile', 'kilometer')).toBeCloseTo(1.60934, 4);
        });

        it('should convert centimeters to inches', () => {
            expect(convert(2.54, 'centimeter', 'inch')).toBeCloseTo(1, 2);
        });

        it('should convert inches to centimeters', () => {
            expect(convert(1, 'inch', 'centimeter')).toBeCloseTo(2.54, 2);
        });

        it('should convert meters to meters (identity)', () => {
            expect(convert(100, 'meter', 'meter')).toBe(100);
        });
    });

    describe('질량 변환 (Mass)', () => {
        it('should convert kilograms to pounds', () => {
            expect(convert(1, 'kilogram', 'pound')).toBeCloseTo(2.20462, 4);
        });

        it('should convert pounds to kilograms', () => {
            expect(convert(2.20462, 'pound', 'kilogram')).toBeCloseTo(1, 2);
        });

        it('should convert grams to ounces', () => {
            expect(convert(28.3495, 'gram', 'ounce')).toBeCloseTo(1, 2);
        });

        it('should convert ounces to grams', () => {
            expect(convert(1, 'ounce', 'gram')).toBeCloseTo(28.3495, 2);
        });

        it('should convert kilograms to grams', () => {
            expect(convert(1, 'kilogram', 'gram')).toBe(1000);
        });

        it('should convert tons to kilograms', () => {
            expect(convert(1, 'ton', 'kilogram')).toBe(1000);
        });
    });

    describe('온도 변환 (Temperature)', () => {
        it('should convert Celsius to Fahrenheit', () => {
            expect(convert(0, 'celsius', 'fahrenheit')).toBe(32);
        });

        it('should convert Fahrenheit to Celsius', () => {
            expect(convert(32, 'fahrenheit', 'celsius')).toBe(0);
        });

        it('should convert Celsius to Kelvin', () => {
            expect(convert(0, 'celsius', 'kelvin')).toBeCloseTo(273.15, 2);
        });

        it('should convert Kelvin to Celsius', () => {
            expect(convert(273.15, 'kelvin', 'celsius')).toBeCloseTo(0, 2);
        });

        it('should convert 100 Celsius to Fahrenheit', () => {
            expect(convert(100, 'celsius', 'fahrenheit')).toBe(212);
        });

        it('should convert -40 (same in C and F)', () => {
            expect(convert(-40, 'celsius', 'fahrenheit')).toBe(-40);
        });

        it('should convert Fahrenheit to Kelvin', () => {
            expect(convert(32, 'fahrenheit', 'kelvin')).toBeCloseTo(273.15, 2);
        });
    });

    describe('시간 변환 (Time)', () => {
        it('should convert hours to minutes', () => {
            expect(convert(1, 'hour', 'minute')).toBe(60);
        });

        it('should convert minutes to seconds', () => {
            expect(convert(1, 'minute', 'second')).toBe(60);
        });

        it('should convert days to hours', () => {
            expect(convert(1, 'day', 'hour')).toBe(24);
        });

        it('should convert weeks to days', () => {
            expect(convert(1, 'week', 'day')).toBe(7);
        });

        it('should convert hours to seconds', () => {
            expect(convert(1, 'hour', 'second')).toBe(3600);
        });

        it('should convert milliseconds to seconds', () => {
            expect(convert(1000, 'millisecond', 'second')).toBe(1);
        });
    });

    describe('부피 변환 (Volume)', () => {
        it('should convert liters to milliliters', () => {
            expect(convert(1, 'liter', 'milliliter')).toBe(1000);
        });

        it('should convert gallons to liters', () => {
            expect(convert(1, 'gallon', 'liter')).toBeCloseTo(3.78541, 4);
        });

        it('should convert liters to gallons', () => {
            expect(convert(3.78541, 'liter', 'gallon')).toBeCloseTo(1, 2);
        });

        it('should convert cubic meters to liters', () => {
            expect(convert(1, 'cubicMeter', 'liter')).toBe(1000);
        });

        it('should convert cups to milliliters', () => {
            expect(convert(1, 'cup', 'milliliter')).toBeCloseTo(236.588, 2);
        });
    });

    describe('면적 변환 (Area)', () => {
        it('should convert square meters to square feet', () => {
            expect(convert(1, 'squareMeter', 'squareFoot')).toBeCloseTo(10.7639, 3);
        });

        it('should convert hectares to acres', () => {
            expect(convert(1, 'hectare', 'acre')).toBeCloseTo(2.47105, 4);
        });

        it('should convert square kilometers to square miles', () => {
            expect(convert(1, 'squareKilometer', 'squareMile')).toBeCloseTo(0.386102, 4);
        });
    });

    describe('에러 처리', () => {
        it('should throw error for invalid source unit', () => {
            expect(() => convert(1, 'invalidUnit' as never, 'meter')).toThrow();
        });

        it('should throw error for invalid target unit', () => {
            expect(() => convert(1, 'meter', 'invalidUnit' as never)).toThrow();
        });

        it('should throw error for incompatible units', () => {
            // 길이 단위를 질량 단위로 변환 시도
            expect(() => convert(1, 'meter', 'kilogram')).toThrow();
        });
    });

    describe('헬퍼 함수', () => {
        it('should convert using helper function', () => {
            expect(convert(100, 'meter', 'feet')).toBeCloseTo(328.084, 2);
        });
    });

    describe('인스턴스 메서드', () => {
        it('should convert using instance method', () => {
            expect(converter.convert(100, 'meter', 'feet')).toBeCloseTo(328.084, 2);
        });

        it('should get available units for category', () => {
            const lengthUnits = converter.getUnitsForCategory('length');
            expect(lengthUnits).toContain('meter');
            expect(lengthUnits).toContain('feet');
            expect(lengthUnits).toContain('kilometer');
        });

        it('should get all categories', () => {
            const categories = converter.getCategories();
            expect(categories).toContain('length');
            expect(categories).toContain('mass');
            expect(categories).toContain('temperature');
            expect(categories).toContain('time');
            expect(categories).toContain('volume');
        });
    });
});
