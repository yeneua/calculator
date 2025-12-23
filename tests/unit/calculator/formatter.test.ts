import { describe, it, expect } from 'vitest';
import { NumberFormatter, formatNumber } from '@/lib/calculator/implementations/NumberFormatter';

/**
 * 숫자 포매터 테스트
 * TDD: RED 단계 - 먼저 테스트 작성
 *
 * 관련 FR: FR-3
 */

describe('NumberFormatter', () => {
    describe('천 단위 구분자', () => {
        it('should format number with thousands separator', () => {
            expect(formatNumber(1234567)).toBe('1,234,567');
        });

        it('should format small numbers without separator', () => {
            expect(formatNumber(999)).toBe('999');
        });

        it('should format 1000 correctly', () => {
            expect(formatNumber(1000)).toBe('1,000');
        });

        it('should format large numbers correctly', () => {
            expect(formatNumber(1234567890)).toBe('1,234,567,890');
        });

        it('should handle negative numbers with separator', () => {
            expect(formatNumber(-1234567)).toBe('-1,234,567');
        });
    });

    describe('소수점 자릿수', () => {
        it('should format decimal numbers', () => {
            const formatter = new NumberFormatter();
            expect(formatter.format(3.14159, { decimalPlaces: 2 })).toBe('3.14');
        });

        it('should format with default decimal places', () => {
            expect(formatNumber(3.14159)).toMatch(/^3\.14/);
        });

        it('should handle very small decimal numbers', () => {
            const formatter = new NumberFormatter();
            expect(formatter.format(0.001234, { decimalPlaces: 4 })).toBe('0.0012');
        });

        it('should round correctly', () => {
            const formatter = new NumberFormatter();
            expect(formatter.format(3.145, { decimalPlaces: 2 })).toBe('3.15');
        });

        it('should round down correctly', () => {
            const formatter = new NumberFormatter();
            expect(formatter.format(3.144, { decimalPlaces: 2 })).toBe('3.14');
        });
    });

    describe('후행 0 제거', () => {
        it('should remove trailing zeros by default', () => {
            const formatter = new NumberFormatter();
            expect(formatter.format(5.0, { removeTrailingZeros: true })).toBe('5');
        });

        it('should remove trailing zeros from decimal', () => {
            const formatter = new NumberFormatter();
            expect(formatter.format(5.100, { removeTrailingZeros: true })).toBe('5.1');
        });

        it('should keep trailing zeros when option is false', () => {
            const formatter = new NumberFormatter();
            expect(
                formatter.format(5.1, {
                    decimalPlaces: 2,
                    removeTrailingZeros: false,
                })
            ).toBe('5.10');
        });
    });

    describe('과학적 표기법', () => {
        it('should use scientific notation for very large numbers', () => {
            const formatted = formatNumber(1e20);
            expect(formatted).toMatch(/[eE]/);
        });

        it('should use scientific notation for very small numbers', () => {
            const formatted = formatNumber(1e-15);
            expect(formatted).toMatch(/[eE]/);
        });

        it('should not use scientific notation for normal numbers', () => {
            const formatted = formatNumber(123456);
            expect(formatted).not.toMatch(/[eE]/);
        });
    });

    describe('천 단위 구분자 옵션', () => {
        it('should format with thousands separator when enabled', () => {
            const formatter = new NumberFormatter();
            expect(formatter.format(1234567, { thousandsSeparator: true })).toBe('1,234,567');
        });

        it('should format without thousands separator when disabled', () => {
            const formatter = new NumberFormatter();
            expect(formatter.format(1234567, { thousandsSeparator: false })).toBe('1234567');
        });
    });

    describe('복합 옵션', () => {
        it('should handle thousands separator with decimal places', () => {
            const formatter = new NumberFormatter();
            expect(
                formatter.format(1234567.891, {
                    thousandsSeparator: true,
                    decimalPlaces: 2,
                })
            ).toBe('1,234,567.89');
        });

        it('should handle all options together', () => {
            const formatter = new NumberFormatter();
            expect(
                formatter.format(1234567.1, {
                    thousandsSeparator: true,
                    decimalPlaces: 2,
                    removeTrailingZeros: true,
                })
            ).toBe('1,234,567.1');
        });
    });

    describe('특수 케이스', () => {
        it('should handle zero', () => {
            expect(formatNumber(0)).toBe('0');
        });

        it('should handle negative zero', () => {
            expect(formatNumber(-0)).toBe('0');
        });

        it('should handle Infinity', () => {
            expect(formatNumber(Infinity)).toBe('Infinity');
        });

        it('should handle negative Infinity', () => {
            expect(formatNumber(-Infinity)).toBe('-Infinity');
        });

        it('should handle NaN', () => {
            expect(formatNumber(NaN)).toBe('NaN');
        });
    });

    describe('parse', () => {
        const formatter = new NumberFormatter();

        it('should parse formatted number with thousands separator', () => {
            expect(formatter.parse('1,234,567')).toBe(1234567);
        });

        it('should parse decimal number', () => {
            expect(formatter.parse('3.14')).toBe(3.14);
        });

        it('should parse negative number', () => {
            expect(formatter.parse('-1,234')).toBe(-1234);
        });

        it('should parse number without separator', () => {
            expect(formatter.parse('12345')).toBe(12345);
        });

        it('should parse zero', () => {
            expect(formatter.parse('0')).toBe(0);
        });
    });
});
