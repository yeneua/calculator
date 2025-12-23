/**
 * 수식 검증 인터페이스
 * SOLID 원칙: Single Responsibility - 수식 유효성 검증만 담당
 */
export interface Validator {
    /**
     * 수식의 유효성을 검증
     * @param expression - 검증할 수식
     * @returns 유효하면 true, 그렇지 않으면 false
     */
    isValid(expression: string): boolean;

    /**
     * 수식 검증 및 에러 메시지 반환
     * @param expression - 검증할 수식
     * @returns 유효하면 null, 그렇지 않으면 에러 메시지
     */
    validate(expression: string): string | null;
}
