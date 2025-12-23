import { describe, it, expect } from 'vitest';
import { evaluateExpression } from '@/lib/calculator/implementations/MathJsEvaluator';

/**
 * 기본 계산 엔진 테스트
 * TDD: GREEN 단계 - 실제 구현 테스트
 */


describe('기본 사칙연산', () => {
    describe('덧셈', () => {
        it('should add two positive numbers', () => {
            expect(evaluateExpression('2 + 3')).toBe(5);
        });

        it('should add negative numbers', () => {
            expect(evaluateExpression('-5 + 3')).toBe(-2);
        });

        it('should add decimal numbers', () => {
            expect(evaluateExpression('2.5 + 3.7')).toBeCloseTo(6.2);
        });
    });

    describe('뺄셈', () => {
        it('should subtract two numbers', () => {
            expect(evaluateExpression('10 - 3')).toBe(7);
        });

        it('should handle negative results', () => {
            expect(evaluateExpression('3 - 10')).toBe(-7);
        });
    });

    describe('곱셈', () => {
        it('should multiply two numbers', () => {
            expect(evaluateExpression('4 * 5')).toBe(20);
        });

        it('should handle multiplication with zero', () => {
            expect(evaluateExpression('100 * 0')).toBe(0);
        });

        it('should multiply decimal numbers', () => {
            expect(evaluateExpression('2.5 * 4')).toBe(10);
        });
    });

    describe('나눗셈', () => {
        it('should divide two numbers', () => {
            expect(evaluateExpression('20 / 4')).toBe(5);
        });

        it('should handle division with decimals', () => {
            expect(evaluateExpression('7 / 2')).toBe(3.5);
        });

        it('should throw error when dividing by zero', () => {
            expect(() => evaluateExpression('5 / 0')).toThrow();
        });
    });

    describe('연산 우선순위', () => {
        it('should follow operator precedence (multiplication before addition)', () => {
            expect(evaluateExpression('2 + 3 * 4')).toBe(14);
        });

        it('should evaluate parentheses first', () => {
            expect(evaluateExpression('(2 + 3) * 4')).toBe(20);
        });

        it('should handle complex expressions', () => {
            expect(evaluateExpression('10 + 2 * 5 - 3')).toBe(17);
        });

        it('should handle nested parentheses', () => {
            expect(evaluateExpression('((2 + 3) * 4) - 5')).toBe(15);
        });
    });

    describe('소수점 정확도', () => {
        it('should handle floating point precision', () => {
            expect(evaluateExpression('0.1 + 0.2')).toBeCloseTo(0.3);
        });

        it('should calculate with high precision', () => {
            expect(evaluateExpression('1234567.89 + 0.11')).toBeCloseTo(1234568);
        });
    });
});
