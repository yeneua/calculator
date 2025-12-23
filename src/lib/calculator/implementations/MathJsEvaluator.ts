import * as math from 'mathjs';
import type { Evaluator } from '../interfaces/Evaluator';

/**
 * Math.js 기반 수식 평가기 구현
 *
 * @remarks
 * TDD 원칙에 따라 개발됨. Math.js 라이브러리를 사용하여
 * 기본 사칙연산과 연산자 우선순위를 정확하게 처리합니다.
 *
 * @example
 * ```typescript
 * const evaluator = new MathJsEvaluator();
 * evaluator.evaluate('2 + 3 * 4'); // returns 14
 * evaluator.evaluate('(2 + 3) * 4'); // returns 20
 * ```
 */
export class MathJsEvaluator implements Evaluator {
    /**
     * 수식을 평가하여 결과를 반환
     *
     * @param expression - 평가할 수식 (예: "2 + 3 * 4")
     * @param _angleMode - 각도 모드 (향후 삼각함수용, 현재는 미사용)
     * @returns 계산 결과
     * @throws {Error} 수식이 비어있거나 유효하지 않은 경우
     * @throws {Error} 0으로 나누기 또는 Infinity가 발생한 경우
     *
     * @example
     * ```typescript
     * evaluator.evaluate('10 / 2'); // returns 5
     * evaluator.evaluate('5 / 0'); // throws Error
     * ```
     */
    evaluate(expression: string, _angleMode: 'DEG' | 'RAD' = 'DEG'): number {
        // 빈 문자열 검증
        if (!expression || expression.trim() === '') {
            throw new Error('Expression cannot be empty');
        }

        try {
            // Math.js를 사용한 수식 평가
            const result = math.evaluate(expression);

            // 결과 타입 검증
            if (typeof result !== 'number') {
                throw new Error(`Expected a number but got ${typeof result}`);
            }

            // Infinity 체크 (0으로 나누기 등)
            if (!isFinite(result)) {
                throw new Error('Division by zero or result is infinity');
            }

            return result;
        } catch (error) {
            // 에러 메시지 개선
            if (error instanceof Error) {
                // 이미 우리가 던진 에러면 그대로 전달
                if (
                    error.message.startsWith('Expression cannot be empty') ||
                    error.message.startsWith('Expected a number') ||
                    error.message.startsWith('Division by zero')
                ) {
                    throw error;
                }
                // Math.js 에러는 래핑하여 전달
                throw new Error(`Invalid expression: ${error.message}`);
            }
            throw new Error('Unknown calculation error occurred');
        }
    }
}

/**
 * 수식 평가를 위한 헬퍼 함수
 *
 * @param expression - 평가할 수식
 * @param angleMode - 각도 모드 (기본값: 'DEG')
 * @returns 계산 결과
 *
 * @remarks
 * 이 함수는 MathJsEvaluator 인스턴스를 생성하고 evaluate를 호출하는
 * 편의 함수입니다. 테스트나 간단한 사용 시 유용합니다.
 *
 * @example
 * ```typescript
 * evaluateExpression('2 + 3'); // returns 5
 * ```
 */
export const evaluateExpression = (
    expression: string,
    angleMode: 'DEG' | 'RAD' = 'DEG'
): number => {
    const evaluator = new MathJsEvaluator();
    return evaluator.evaluate(expression, angleMode);
};
