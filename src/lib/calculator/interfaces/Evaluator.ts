/**
 * 수식 평가 인터페이스
 * SOLID 원칙: Single Responsibility - 수식 평가만 담당
 */
export interface Evaluator {
    /**
     * 수식을 평가하여 결과를 반환
     * @param expression - 평가할 수식
     * @param angleMode - 각도 모드 (DEG/RAD)
     * @returns 계산 결과
     * @throws Error - 수식이 유효하지 않거나 계산 오류 발생 시
     */
    evaluate(expression: string, angleMode?: 'DEG' | 'RAD'): number;
}
