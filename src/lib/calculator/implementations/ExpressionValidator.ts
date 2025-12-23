import type { Validator } from '../interfaces/Validator';

/**
 * 수식 검증기 구현
 *
 * @remarks
 * TDD 원칙에 따라 개발됨. 수식의 유효성을 검증하고,
 * XSS 등 보안 위협이 되는 패턴을 차단합니다.
 *
 * @example
 * ```typescript
 * const validator = new ExpressionValidator();
 * validator.isValid('2 + 3'); // true
 * validator.isValid('2 + + 3'); // false
 * validator.validate('(2 + 3'); // '괄호가 일치하지 않습니다'
 * ```
 */
export class ExpressionValidator implements Validator {
    /**
     * 허용되는 수학 함수 목록
     */
    private static readonly ALLOWED_FUNCTIONS = [
        'sin',
        'cos',
        'tan',
        'cot',
        'sec',
        'csc',
        'asin',
        'acos',
        'atan',
        'acot',
        'asec',
        'acsc',
        'sinh',
        'cosh',
        'tanh',
        'log',
        'log10',
        'log2',
        'ln',
        'exp',
        'sqrt',
        'cbrt',
        'nthRoot',
        'abs',
        'ceil',
        'floor',
        'round',
        'sign',
    ];

    /**
     * 허용되는 상수 목록
     */
    private static readonly ALLOWED_CONSTANTS = ['pi', 'e', 'PI', 'E'];

    /**
     * 위험한 패턴 목록 (XSS 및 코드 인젝션 방지)
     */
    private static readonly DANGEROUS_PATTERNS = [
        /<script/i,
        /javascript:/i,
        /on\w+\s*=/i, // onclick, onerror 등
        /eval\s*\(/i,
        /Function\s*\(/i,
        /import\s*\(/i,
        /require\s*\(/i,
        /constructor/i,
        /__proto__/i,
        /prototype/i,
        /\[\s*['"]constructor['"]\s*\]/i,
        /document\./i,
        /window\./i,
        /globalThis/i,
        /fetch\s*\(/i,
        /XMLHttpRequest/i,
    ];

    /**
     * 이진 연산자 목록
     */
    private static readonly BINARY_OPERATORS = ['+', '-', '*', '/', '^', '%'];

    /**
     * 수식의 유효성을 검증
     *
     * @param expression - 검증할 수식
     * @returns 유효하면 true, 그렇지 않으면 false
     */
    isValid(expression: string): boolean {
        return this.validate(expression) === null;
    }

    /**
     * 수식 검증 및 에러 메시지 반환
     *
     * @param expression - 검증할 수식
     * @returns 유효하면 null, 그렇지 않으면 에러 메시지
     */
    validate(expression: string): string | null {
        // 빈 문자열 검증
        if (!expression || expression.trim() === '') {
            return '수식이 비어있습니다';
        }

        // 위험한 패턴 검증
        const dangerousError = this.checkDangerousPatterns(expression);
        if (dangerousError) {
            return dangerousError;
        }

        // 괄호 매칭 검증
        const parenthesesError = this.checkParentheses(expression);
        if (parenthesesError) {
            return parenthesesError;
        }

        // 연산자 검증
        const operatorError = this.checkOperators(expression);
        if (operatorError) {
            return operatorError;
        }

        return null;
    }

    /**
     * 위험한 패턴 검사
     */
    private checkDangerousPatterns(expression: string): string | null {
        for (const pattern of ExpressionValidator.DANGEROUS_PATTERNS) {
            if (pattern.test(expression)) {
                return '허용되지 않는 패턴이 포함되어 있습니다';
            }
        }
        return null;
    }

    /**
     * 괄호 매칭 검사
     */
    private checkParentheses(expression: string): string | null {
        let count = 0;

        for (const char of expression) {
            if (char === '(') {
                count++;
            } else if (char === ')') {
                count--;
                if (count < 0) {
                    return '괄호가 일치하지 않습니다: 닫는 괄호가 너무 많습니다';
                }
            }
        }

        if (count !== 0) {
            return '괄호가 일치하지 않습니다: 여는 괄호가 닫히지 않았습니다';
        }

        // 빈 괄호 검사
        if (/\(\s*\)/.test(expression)) {
            return '빈 괄호가 있습니다';
        }

        // 연산자 뒤에 닫는 괄호 검사
        if (/[+\-*/^%]\s*\)/.test(expression)) {
            return '연산자 뒤에 닫는 괄호가 올 수 없습니다';
        }

        return null;
    }

    /**
     * 연산자 검증
     */
    private checkOperators(expression: string): string | null {
        const trimmed = expression.trim();

        // 이진 연산자로 시작하는지 검사 (단항 마이너스 제외)
        if (/^[+*/^%]/.test(trimmed)) {
            return '수식이 이진 연산자로 시작할 수 없습니다';
        }

        // 연산자로 끝나는지 검사
        if (/[+\-*/^%]$/.test(trimmed)) {
            return '수식이 연산자로 끝날 수 없습니다';
        }

        // 연속 연산자 검사
        // 모든 연산자 뒤에 다른 연산자가 오면 안 됨 (단항 마이너스 제외)
        // 하지만 "2 * -3" 은 허용 (곱셈/나눗셈/거듭제곱 뒤의 단항 마이너스)
        // "2 + + 3", "2 - - 3", "2 * / 3" 은 거부

        // 패턴 1: +, -, *, /, ^, % 뒤에 +, *, /, ^, % 가 오는 경우 (항상 에러)
        if (/[+\-*/^%]\s*[+*/^%]/.test(trimmed)) {
            return '연속된 연산자가 있습니다';
        }

        // 패턴 2: +, - 뒤에 - 가 오는 경우 (에러: 2 + - 3, 2 - - 3)
        if (/[+\-]\s*-/.test(trimmed)) {
            return '연속된 연산자가 있습니다';
        }

        return null;
    }
}

/**
 * 수식 검증을 위한 헬퍼 함수
 *
 * @param expression - 검증할 수식
 * @returns 유효하면 true, 그렇지 않으면 false
 *
 * @example
 * ```typescript
 * isValidExpression('2 + 3'); // true
 * isValidExpression('2 + + 3'); // false
 * ```
 */
export const isValidExpression = (expression: string): boolean => {
    const validator = new ExpressionValidator();
    return validator.isValid(expression);
};

/**
 * 수식 검증 및 에러 메시지를 위한 헬퍼 함수
 *
 * @param expression - 검증할 수식
 * @returns 유효하면 null, 그렇지 않으면 에러 메시지
 */
export const validateExpression = (expression: string): string | null => {
    const validator = new ExpressionValidator();
    return validator.validate(expression);
};
