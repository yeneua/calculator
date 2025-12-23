import * as math from 'mathjs';
import type { Evaluator } from '../interfaces/Evaluator';

/**
 * Math.js 기반 수식 평가기 구현
 *
 * @remarks
 * TDD 원칙에 따라 개발됨. Math.js 라이브러리를 사용하여
 * 기본 사칙연산과 연산자 우선순위를 정확하게 처리합니다.
 * DEG/RAD 모드를 지원하여 삼각함수의 각도 단위를 변환합니다.
 *
 * @example
 * ```typescript
 * const evaluator = new MathJsEvaluator();
 * evaluator.evaluate('2 + 3 * 4'); // returns 14
 * evaluator.evaluate('sin(30)', 'DEG'); // returns 0.5
 * ```
 */
export class MathJsEvaluator implements Evaluator {
    /**
     * DEG 모드에서 사용할 커스텀 Math.js 스코프 생성
     * 삼각함수 입력을 각도에서 라디안으로 변환
     * 역삼각함수 출력을 라디안에서 각도로 변환
     */
    private createDegScope(): Record<string, unknown> {
        const degToRad = (degrees: number) => degrees * (Math.PI / 180);
        const radToDeg = (radians: number) => radians * (180 / Math.PI);

        return {
            // 기본 삼각함수 (입력: DEG → 내부: RAD)
            sin: (x: number) => math.sin(degToRad(x)),
            cos: (x: number) => math.cos(degToRad(x)),
            tan: (x: number) => math.tan(degToRad(x)),
            cot: (x: number) => math.cot(degToRad(x)),
            sec: (x: number) => math.sec(degToRad(x)),
            csc: (x: number) => math.csc(degToRad(x)),

            // 역삼각함수 (출력: RAD → DEG)
            // Math.js 역삼각함수는 number | Complex를 반환할 수 있으므로 Number()로 변환
            asin: (x: number) => radToDeg(Number(math.asin(x))),
            acos: (x: number) => radToDeg(Number(math.acos(x))),
            atan: (x: number) => radToDeg(Number(math.atan(x))),
            acot: (x: number) => radToDeg(Number(math.acot(x))),
            asec: (x: number) => radToDeg(Number(math.asec(x))),
            acsc: (x: number) => radToDeg(Number(math.acsc(x))),

            // 상수
            pi: Math.PI,
            e: Math.E,
        };
    }


    /**
     * RAD 모드에서 사용할 커스텀 Math.js 스코프 생성
     * Math.js 기본 동작 (라디안) 유지
     */
    private createRadScope(): Record<string, unknown> {
        return {
            // 기본 삼각함수 (Math.js 기본 = RAD)
            sin: math.sin,
            cos: math.cos,
            tan: math.tan,
            cot: math.cot,
            sec: math.sec,
            csc: math.csc,

            // 역삼각함수 (Math.js 기본 = RAD 출력)
            asin: math.asin,
            acos: math.acos,
            atan: math.atan,
            acot: math.acot,
            asec: math.asec,
            acsc: math.acsc,

            // 상수
            pi: Math.PI,
            e: Math.E,
        };
    }

    /**
     * 수식을 평가하여 결과를 반환
     *
     * @param expression - 평가할 수식 (예: "2 + 3 * 4")
     * @param angleMode - 각도 모드 (DEG: 도, RAD: 라디안)
     * @returns 계산 결과
     * @throws {Error} 수식이 비어있거나 유효하지 않은 경우
     * @throws {Error} 0으로 나누기 또는 Infinity가 발생한 경우
     *
     * @example
     * ```typescript
     * evaluator.evaluate('10 / 2'); // returns 5
     * evaluator.evaluate('sin(30)', 'DEG'); // returns 0.5
     * evaluator.evaluate('sin(pi/6)', 'RAD'); // returns 0.5
     * ```
     */
    evaluate(expression: string, angleMode: 'DEG' | 'RAD' = 'DEG'): number {
        // 빈 문자열 검증
        if (!expression || expression.trim() === '') {
            throw new Error('Expression cannot be empty');
        }

        try {
            // 각도 모드에 따른 스코프 선택
            const scope = angleMode === 'DEG' ? this.createDegScope() : this.createRadScope();

            // Math.js를 사용한 수식 평가 (스코프 적용)
            const result = math.evaluate(expression, scope);

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
