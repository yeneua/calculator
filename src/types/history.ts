/**
 * 계산 히스토리 엔트리
 */
export interface HistoryEntry {
    id: string;
    expression: string;
    result: string;
    timestamp: number;
}

/**
 * 날짜별 그룹화된 히스토리
 */
export interface GroupedHistory {
    title: string; // 'Today', 'Yesterday', 'YYYY-MM-DD'
    entries: HistoryEntry[];
}
