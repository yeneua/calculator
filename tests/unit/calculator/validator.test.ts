import { describe, it, expect } from 'vitest';
import {
    ExpressionValidator,
    isValidExpression,
} from '@/lib/calculator/implementations/ExpressionValidator';

/**
 * 수식 검증기 테스트
 * TDD: RED 단계 - 먼저 테스트 작성
 *
 * 관련 FR: FR-10
 */

describe('ExpressionValidator', () => {
    const validator = new ExpressionValidator();

    describe('유효한 수식', () => {
        it('should accept simple addition', () => {
            expect(validator.isValid('2 + 3')).toBe(true);
        });

        it('should accept simple subtraction', () => {
            expect(validator.isValid('10 - 5')).toBe(true);
        });

        it('should accept multiplication', () => {
            expect(validator.isValid('4 * 5')).toBe(true);
        });

        it('should accept division', () => {
            expect(validator.isValid('20 / 4')).toBe(true);
        });

        it('should accept complex expression', () => {
            expect(validator.isValid('2 + 3 * 4 - 5 / 2')).toBe(true);
        });

        it('should accept expression with parentheses', () => {
            expect(validator.isValid('(2 + 3) * 4')).toBe(true);
        });

        it('should accept nested parentheses', () => {
            expect(validator.isValid('((2 + 3) * 4)')).toBe(true);
        });

        it('should accept decimal numbers', () => {
            expect(validator.isValid('3.14 + 2.86')).toBe(true);
        });

        it('should accept negative numbers', () => {
            expect(validator.isValid('-5 + 3')).toBe(true);
        });

        it('should accept single number', () => {
            expect(validator.isValid('42')).toBe(true);
        });

        it('should accept mathematical functions', () => {
            expect(validator.isValid('sin(30)')).toBe(true);
        });

        it('should accept pi and e constants', () => {
            expect(validator.isValid('pi * 2')).toBe(true);
            expect(validator.isValid('e ^ 2')).toBe(true);
        });

        it('should accept power operator', () => {
            expect(validator.isValid('2 ^ 3')).toBe(true);
        });

        it('should accept factorial', () => {
            expect(validator.isValid('5!')).toBe(true);
        });
    });

    describe('괄호 매칭', () => {
        it('should reject mismatched opening parenthesis', () => {
            expect(validator.isValid('(2 + 3')).toBe(false);
        });

        it('should reject mismatched closing parenthesis', () => {
            expect(validator.isValid('2 + 3)')).toBe(false);
        });

        it('should reject reversed parentheses', () => {
            expect(validator.isValid(')2 + 3(')).toBe(false);
        });

        it('should accept balanced complex parentheses', () => {
            expect(validator.isValid('((a + b) * (c - d))')).toBe(true);
        });

        it('should reject unbalanced nested parentheses', () => {
            expect(validator.isValid('((2 + 3) * 4')).toBe(false);
        });
    });

    describe('연속 연산자 검증', () => {
        it('should reject consecutive plus operators', () => {
            expect(validator.isValid('2 + + 3')).toBe(false);
        });

        it('should reject consecutive minus operators (not negative)', () => {
            expect(validator.isValid('2 - - 3')).toBe(false);
        });

        it('should reject consecutive mixed operators', () => {
            expect(validator.isValid('2 * / 3')).toBe(false);
        });

        it('should reject expression ending with operator', () => {
            expect(validator.isValid('2 + 3 +')).toBe(false);
        });

        it('should reject expression starting with binary operator', () => {
            expect(validator.isValid('* 2 + 3')).toBe(false);
        });

        it('should reject empty parentheses', () => {
            expect(validator.isValid('()')).toBe(false);
        });

        it('should reject operator before closing parenthesis', () => {
            expect(validator.isValid('(2 + )')).toBe(false);
        });
    });

    describe('위험한 패턴 검증 (XSS 방지)', () => {
        it('should reject script tags', () => {
            expect(validator.isValid('<script>alert(1)</script>')).toBe(false);
        });

        it('should reject javascript protocol', () => {
            expect(validator.isValid('javascript:alert(1)')).toBe(false);
        });

        it('should reject eval function', () => {
            expect(validator.isValid('eval("1+1")')).toBe(false);
        });

        it('should reject Function constructor', () => {
            expect(validator.isValid('Function("return 1")()')).toBe(false);
        });

        it('should reject import statements', () => {
            expect(validator.isValid('import("module")')).toBe(false);
        });

        it('should reject constructor access', () => {
            expect(validator.isValid('constructor')).toBe(false);
        });

        it('should reject __proto__ access', () => {
            expect(validator.isValid('__proto__')).toBe(false);
        });

        it('should reject prototype access', () => {
            expect(validator.isValid('prototype')).toBe(false);
        });
    });

    describe('validate 메서드', () => {
        it('should return null for valid expression', () => {
            expect(validator.validate('2 + 3')).toBeNull();
        });

        it('should return error message for invalid parentheses', () => {
            const error = validator.validate('(2 + 3');
            expect(error).not.toBeNull();
            expect(error).toContain('괄호');
        });

        it('should return error message for consecutive operators', () => {
            const error = validator.validate('2 + + 3');
            expect(error).not.toBeNull();
            expect(error).toContain('연산자');
        });

        it('should return error message for dangerous patterns', () => {
            const error = validator.validate('eval("1")');
            expect(error).not.toBeNull();
            expect(error).toContain('허용되지 않');
        });
    });

    describe('빈 문자열 및 공백', () => {
        it('should reject empty string', () => {
            expect(validator.isValid('')).toBe(false);
        });

        it('should reject whitespace only', () => {
            expect(validator.isValid('   ')).toBe(false);
        });

        it('should accept expression with spaces', () => {
            expect(validator.isValid('2  +  3')).toBe(true);
        });
    });

    describe('헬퍼 함수', () => {
        it('should validate using isValidExpression helper', () => {
            expect(isValidExpression('2 + 3')).toBe(true);
        });

        it('should reject invalid expression using helper', () => {
            expect(isValidExpression('2 + + 3')).toBe(false);
        });
    });
});
