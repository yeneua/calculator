import { describe, it, expect } from 'vitest';
import { evaluateExpression } from '@/lib/calculator/implementations/MathJsEvaluator';

/**
 * 공학 함수 계산 테스트
 * TDD: RED 단계 - 먼저 테스트 작성, 실패 확인
 *
 * 관련 FR: FR-4, FR-5, FR-6, FR-7
 */

describe('삼각함수 (DEG 모드)', () => {
    describe('기본 삼각함수', () => {
        it('should calculate sin(30) = 0.5 in DEG mode', () => {
            expect(evaluateExpression('sin(30)', 'DEG')).toBeCloseTo(0.5, 5);
        });

        it('should calculate sin(90) = 1 in DEG mode', () => {
            expect(evaluateExpression('sin(90)', 'DEG')).toBeCloseTo(1, 5);
        });

        it('should calculate cos(60) = 0.5 in DEG mode', () => {
            expect(evaluateExpression('cos(60)', 'DEG')).toBeCloseTo(0.5, 5);
        });

        it('should calculate cos(0) = 1 in DEG mode', () => {
            expect(evaluateExpression('cos(0)', 'DEG')).toBeCloseTo(1, 5);
        });

        it('should calculate tan(45) = 1 in DEG mode', () => {
            expect(evaluateExpression('tan(45)', 'DEG')).toBeCloseTo(1, 5);
        });

        it('should calculate tan(0) = 0 in DEG mode', () => {
            expect(evaluateExpression('tan(0)', 'DEG')).toBeCloseTo(0, 5);
        });
    });

    describe('역삼각함수', () => {
        it('should calculate asin(0.5) = 30 in DEG mode', () => {
            expect(evaluateExpression('asin(0.5)', 'DEG')).toBeCloseTo(30, 5);
        });

        it('should calculate acos(0.5) = 60 in DEG mode', () => {
            expect(evaluateExpression('acos(0.5)', 'DEG')).toBeCloseTo(60, 5);
        });

        it('should calculate atan(1) = 45 in DEG mode', () => {
            expect(evaluateExpression('atan(1)', 'DEG')).toBeCloseTo(45, 5);
        });
    });
});

describe('삼각함수 (RAD 모드)', () => {
    describe('기본 삼각함수', () => {
        it('should calculate sin(π/6) = 0.5 in RAD mode', () => {
            expect(evaluateExpression('sin(pi/6)', 'RAD')).toBeCloseTo(0.5, 5);
        });

        it('should calculate sin(π/2) = 1 in RAD mode', () => {
            expect(evaluateExpression('sin(pi/2)', 'RAD')).toBeCloseTo(1, 5);
        });

        it('should calculate cos(π/3) = 0.5 in RAD mode', () => {
            expect(evaluateExpression('cos(pi/3)', 'RAD')).toBeCloseTo(0.5, 5);
        });

        it('should calculate tan(π/4) = 1 in RAD mode', () => {
            expect(evaluateExpression('tan(pi/4)', 'RAD')).toBeCloseTo(1, 5);
        });
    });

    describe('역삼각함수', () => {
        it('should calculate asin(0.5) = π/6 in RAD mode', () => {
            expect(evaluateExpression('asin(0.5)', 'RAD')).toBeCloseTo(Math.PI / 6, 5);
        });

        it('should calculate acos(0.5) = π/3 in RAD mode', () => {
            expect(evaluateExpression('acos(0.5)', 'RAD')).toBeCloseTo(Math.PI / 3, 5);
        });

        it('should calculate atan(1) = π/4 in RAD mode', () => {
            expect(evaluateExpression('atan(1)', 'RAD')).toBeCloseTo(Math.PI / 4, 5);
        });
    });
});

describe('로그 함수', () => {
    it('should calculate ln(e) = 1', () => {
        expect(evaluateExpression('log(e)')).toBeCloseTo(1, 5);
    });

    it('should calculate ln(1) = 0', () => {
        expect(evaluateExpression('log(1)')).toBeCloseTo(0, 5);
    });

    it('should calculate log10(100) = 2', () => {
        expect(evaluateExpression('log10(100)')).toBeCloseTo(2, 5);
    });

    it('should calculate log10(1000) = 3', () => {
        expect(evaluateExpression('log10(1000)')).toBeCloseTo(3, 5);
    });

    it('should calculate log2(8) = 3', () => {
        expect(evaluateExpression('log2(8)')).toBeCloseTo(3, 5);
    });
});

describe('거듭제곱과 루트', () => {
    describe('거듭제곱', () => {
        it('should calculate 2^3 = 8', () => {
            expect(evaluateExpression('2^3')).toBe(8);
        });

        it('should calculate 5^2 = 25', () => {
            expect(evaluateExpression('5^2')).toBe(25);
        });

        it('should calculate 10^0 = 1', () => {
            expect(evaluateExpression('10^0')).toBe(1);
        });

        it('should calculate 2^-1 = 0.5', () => {
            expect(evaluateExpression('2^-1')).toBeCloseTo(0.5, 5);
        });

        it('should calculate e^1', () => {
            expect(evaluateExpression('e^1')).toBeCloseTo(Math.E, 5);
        });
    });

    describe('제곱근', () => {
        it('should calculate sqrt(4) = 2', () => {
            expect(evaluateExpression('sqrt(4)')).toBe(2);
        });

        it('should calculate sqrt(9) = 3', () => {
            expect(evaluateExpression('sqrt(9)')).toBe(3);
        });

        it('should calculate sqrt(2)', () => {
            expect(evaluateExpression('sqrt(2)')).toBeCloseTo(1.41421356, 5);
        });
    });

    describe('n제곱근', () => {
        it('should calculate cbrt(8) = 2 (cube root)', () => {
            expect(evaluateExpression('cbrt(8)')).toBeCloseTo(2, 5);
        });

        it('should calculate cbrt(27) = 3', () => {
            expect(evaluateExpression('cbrt(27)')).toBeCloseTo(3, 5);
        });

        it('should calculate nthRoot(16, 4) = 2', () => {
            expect(evaluateExpression('nthRoot(16, 4)')).toBeCloseTo(2, 5);
        });
    });
});

describe('팩토리얼', () => {
    it('should calculate 0! = 1', () => {
        expect(evaluateExpression('0!')).toBe(1);
    });

    it('should calculate 1! = 1', () => {
        expect(evaluateExpression('1!')).toBe(1);
    });

    it('should calculate 5! = 120', () => {
        expect(evaluateExpression('5!')).toBe(120);
    });

    it('should calculate 10! = 3628800', () => {
        expect(evaluateExpression('10!')).toBe(3628800);
    });
});

describe('수학 상수', () => {
    it('should use π (pi) correctly', () => {
        expect(evaluateExpression('pi')).toBeCloseTo(Math.PI, 5);
    });

    it('should use e (Euler number) correctly', () => {
        expect(evaluateExpression('e')).toBeCloseTo(Math.E, 5);
    });

    it('should calculate pi * 2', () => {
        expect(evaluateExpression('pi * 2')).toBeCloseTo(2 * Math.PI, 5);
    });

    it('should calculate e^2', () => {
        expect(evaluateExpression('e^2')).toBeCloseTo(Math.E ** 2, 5);
    });
});

describe('지수 함수', () => {
    it('should calculate exp(1) = e', () => {
        expect(evaluateExpression('exp(1)')).toBeCloseTo(Math.E, 5);
    });

    it('should calculate exp(0) = 1', () => {
        expect(evaluateExpression('exp(0)')).toBe(1);
    });

    it('should calculate exp(2)', () => {
        expect(evaluateExpression('exp(2)')).toBeCloseTo(Math.E ** 2, 5);
    });
});

describe('절대값', () => {
    it('should calculate abs(-5) = 5', () => {
        expect(evaluateExpression('abs(-5)')).toBe(5);
    });

    it('should calculate abs(5) = 5', () => {
        expect(evaluateExpression('abs(5)')).toBe(5);
    });

    it('should calculate abs(-3.14)', () => {
        expect(evaluateExpression('abs(-3.14)')).toBeCloseTo(3.14, 5);
    });
});

describe('복합 수식', () => {
    it('should calculate sin(30)^2 + cos(30)^2 = 1 (DEG mode)', () => {
        expect(evaluateExpression('sin(30)^2 + cos(30)^2', 'DEG')).toBeCloseTo(1, 5);
    });

    it('should calculate log10(10^5) = 5', () => {
        expect(evaluateExpression('log10(10^5)')).toBeCloseTo(5, 5);
    });

    it('should calculate sqrt(3^2 + 4^2) = 5', () => {
        expect(evaluateExpression('sqrt(3^2 + 4^2)')).toBe(5);
    });

    it('should calculate e^(ln(10))', () => {
        expect(evaluateExpression('e^log(10)')).toBeCloseTo(10, 5);
    });
});
