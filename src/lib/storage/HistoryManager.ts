import type { Repository } from './interfaces/Repository';
import type { HistoryEntry, GroupedHistory } from '@/types/history';

/**
 * 히스토리 관리자
 *
 * @remarks
 * 계산 기록을 관리하고, 검색, 필터링, 그룹화 기능을 제공합니다.
 * Repository 패턴을 사용하여 저장소 구현과 비즈니스 로직을 분리합니다.
 */
export class HistoryManager {
    private repository: Repository<HistoryEntry[]>;
    private static readonly MAX_ENTRIES = 1000;

    constructor(repository: Repository<HistoryEntry[]>) {
        this.repository = repository;
    }

    /**
     * 히스토리 추가
     */
    addHistory(expression: string, result: string): HistoryEntry {
        const entry: HistoryEntry = {
            id: this.generateId(),
            expression,
            result,
            timestamp: Date.now(),
        };

        const currentHistory = this.repository.load() || [];

        // 최신 항목이 맨 앞에 오도록 추가
        const newHistory = [entry, ...currentHistory];

        // 최대 개수 제한
        if (newHistory.length > HistoryManager.MAX_ENTRIES) {
            newHistory.length = HistoryManager.MAX_ENTRIES;
        }

        this.repository.save(newHistory);
        return entry;
    }

    /**
     * 히스토리 전체 삭제
     */
    clearHistory(): void {
        this.repository.clear();
    }

    /**
     * 특정 항목 삭제
     */
    removeEntry(id: string): void {
        const currentHistory = this.repository.load();
        if (!currentHistory) return;

        const newHistory = currentHistory.filter((entry) => entry.id !== id);
        this.repository.save(newHistory);
    }

    /**
     * 히스토리 검색
     */
    search(query: string): HistoryEntry[] {
        const currentHistory = this.repository.load();
        if (!currentHistory) return [];

        const lowerQuery = query.toLowerCase();
        return currentHistory.filter(
            (entry) =>
                entry.expression.toLowerCase().includes(lowerQuery) ||
                entry.result.toLowerCase().includes(lowerQuery)
        );
    }

    /**
     * 날짜별 그룹화된 히스토리 반환
     */
    getGroupedHistory(): GroupedHistory[] {
        const currentHistory = this.repository.load();
        if (!currentHistory || currentHistory.length === 0) return [];

        const groups: Record<string, HistoryEntry[]> = {};
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();

        currentHistory.forEach((entry) => {
            const date = new Date(entry.timestamp).toDateString();
            let title = date;

            if (date === today) {
                title = 'Today';
            } else if (date === yesterday) {
                title = 'Yesterday';
            }

            if (!groups[title]) {
                groups[title] = [];
            }
            groups[title].push(entry);
        });

        // 결과 배열 변환 (순서는 날짜 내림차순 - Today가 먼저)
        // 하지만 객체 순서는 보장되지 않으므로 정렬 필요
        // 현재 로직은 간단히 구현. 실제로는 날짜 정렬 로직이 더 필요할 수 있음.
        // Today, Yesterday가 최상위에 오도록 처리

        const result: GroupedHistory[] = Object.keys(groups).map((title) => ({
            title,
            entries: groups[title],
        }));

        // 정렬: Today -> Yesterday -> 날짜 내림차순
        return result.sort((a, b) => {
            if (a.title === 'Today') return -1;
            if (b.title === 'Today') return 1;
            if (a.title === 'Yesterday') return -1;
            if (b.title === 'Yesterday') return 1;
            return new Date(b.title).getTime() - new Date(a.title).getTime();
        });
    }

    /**
     * ID 생성 (간단한 구현)
     */
    private generateId(): string {
        return Date.now().toString(36) + Math.random().toString(36).substring(2);
    }
}
