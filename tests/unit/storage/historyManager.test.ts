import { describe, it, expect, beforeEach } from 'vitest';
import { HistoryManager } from '@/lib/storage/HistoryManager';
import { MemoryRepository } from '@/lib/storage/implementations/MemoryRepository';
import type { HistoryEntry } from '@/types/history';

/**
 * 히스토리 관리자 테스트
 * TDD: RED 단계 - 먼저 테스트 작성
 *
 * 관련 FR: FR-11 ~ FR-14
 */

describe('HistoryManager', () => {
    let repository: MemoryRepository<HistoryEntry[]>;
    let manager: HistoryManager;

    beforeEach(() => {
        repository = new MemoryRepository<HistoryEntry[]>();
        manager = new HistoryManager(repository);
    });

    it('should add history entry', () => {
        const entry = manager.addHistory('2 + 3', '5');

        expect(entry.expression).toBe('2 + 3');
        expect(entry.result).toBe('5');
        expect(entry.id).toBeDefined();
        expect(entry.timestamp).toBeDefined();

        const stored = repository.load();
        expect(stored).toHaveLength(1);
        expect(stored![0]).toEqual(entry);
    });

    it('should limit history entries (max 1000)', () => {
        // 1005개 추가
        for (let i = 0; i < 1005; i++) {
            manager.addHistory(`${i}`, `${i}`);
        }

        const stored = repository.load();
        expect(stored).toHaveLength(1000);
        // 가장 최신(마지막에 추가된) 항목이 있어야 함 (인덱스 0이 최신)
        expect(stored![0].expression).toBe('1004');
    });

    it('should clear all history', () => {
        manager.addHistory('1 + 1', '2');
        manager.clearHistory();

        const stored = repository.load();
        expect(stored === null || stored.length === 0).toBe(true);
    });

    it('should remove specific entry', () => {
        const entry1 = manager.addHistory('1 + 1', '2');
        const entry2 = manager.addHistory('2 + 2', '4');

        manager.removeEntry(entry2.id);

        const stored = repository.load();
        expect(stored).toHaveLength(1);
        expect(stored![0].id).toBe(entry1.id);
    });

    it('should search history', () => {
        manager.addHistory('2 + 3', '5');
        manager.addHistory('10 * 10', '100');
        manager.addHistory('sin(30)', '0.5');

        const results1 = manager.search('sin');
        expect(results1).toHaveLength(1);
        expect(results1[0].expression).toContain('sin');

        const results2 = manager.search('10');
        expect(results2).toHaveLength(1); // '10 * 10' 하나 (결과 '100' 포함하면 2개일 수도 있지만, 정책에 따라 다름. 여기선 수식/결과 모두 검색 가정)

        // 결과값 검색 테스트
        const results3 = manager.search('100');
        expect(results3).toHaveLength(1);
        expect(results3[0].result).toBe('100');
    });

    it('should get grouped history', () => {
        // 오늘 데이터
        manager.addHistory('1 + 1', '2');

        // 어제 데이터 (timestamp 조작 필요하지만 HistoryManager 내부 구현에 의존하므로
        // 여기서는 HistoryManager에 date를 주입할 수 있거나, mocking해야 함.
        // 혹은 단순히 Grouping 로직만 별도로 테스트할 수도 있음.
        // 현재는 간단히 'Today' 그룹만 확인)

        const grouped = manager.getGroupedHistory();
        expect(grouped.length).toBeGreaterThan(0);
        expect(grouped[0].title).toBe('Today');
        expect(grouped[0].entries).toHaveLength(1);
    });
});
