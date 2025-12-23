/**
 * 계산기 타입 정의
 */

/**
 * 각도 모드
 */
export type AngleMode = 'DEG' | 'RAD';

/**
 * 계산기 모드
 */
export type CalculatorMode = 'standard' | 'scientific';

/**
 * 계산 결과
 */
export interface CalculationResult {
    value: number;
    error: string | null;
}

/**
 * 계산 히스토리 엔트리
 */
export interface HistoryEntry {
    id: string;
    expression: string;
    result: number | string;
    timestamp: number;
    mode: CalculatorMode;
    angleMode?: AngleMode;
}

/**
 * 메모리 상태
 */
export interface MemoryState {
    value: number;
    lastUpdated: number;
}

/**
 * 계산기 상태
 */
export interface CalculatorState {
    expression: string;
    result: number | string | null;
    memory: number;
    angleMode: AngleMode;
    secondMode: boolean;
    error: string | null;
}
