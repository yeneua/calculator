import { describe, it, expect, beforeEach, vi } from 'vitest';
import { act } from '@testing-library/react';
import { useHistoryStore } from '@/store/historyStore';
// HistoryManager mock은 복잡할 수 있으므로, 실제 구현을 사용하거나
// localStorage를 mock하여 간접적으로 테스트합니다.
// 여기서는 통합 테스트 느낌으로 가겠습니다.

/**
 * History Store 테스트
 * TDD: RED 단계
 *
 * 관련 FR: FR-11 ~ FR-15
 */

describe('HistoryStore', () => {
    beforeEach(() => {
        const store = useHistoryStore.getState();
        store.clearAll();
        // localStorage mock 초기화가 필요하다면 여기서 수행
        // vitest 환경 설정에서 이미 처리되었을 수 있음
        window.localStorage.clear();
    });

    it('should initialize with empty history', () => {
        const state = useHistoryStore.getState();
        expect(state.entries).toHaveLength(0);
        expect(state.searchQuery).toBe('');
    });

    it('should add history entry', () => {
        const store = useHistoryStore.getState();
        act(() => store.addEntry('1 + 1', '2'));

        const state = useHistoryStore.getState();
        expect(state.entries).toHaveLength(1);
        expect(state.entries[0].expression).toBe('1 + 1');
    });

    it('should remove entry', () => {
        const store = useHistoryStore.getState();
        act(() => store.addEntry('1 + 1', '2'));
        const id = useHistoryStore.getState().entries[0].id;

        act(() => store.removeEntry(id));

        const state = useHistoryStore.getState();
        expect(state.entries).toHaveLength(0);
    });

    it('should clear all entries', () => {
        const store = useHistoryStore.getState();
        act(() => store.addEntry('1', '1'));
        act(() => store.addEntry('2', '2'));

        act(() => store.clearAll());

        const state = useHistoryStore.getState();
        expect(state.entries).toHaveLength(0);
    });

    it('should filter entries by search query', () => {
        const store = useHistoryStore.getState();
        act(() => store.addEntry('10 + 10', '20'));
        act(() => store.addEntry('5 * 5', '25'));

        act(() => store.setSearchQuery('10'));

        // getFilteredEntries 같은 selector가 있다면 그것을 테스트
        // Store 상태 자체에 filteredEntries가 있다면 그것을확인
        // 여기서는 searchResults를 반환하는 selector 함수를 테스트한다고 가정
        const results = store.getFilteredEntries();
        expect(results).toHaveLength(1);
        expect(results[0].expression).toBe('10 + 10');
    });

    it('should group entries by date', () => {
        const store = useHistoryStore.getState();
        act(() => store.addEntry('1 + 1', '2'));

        const groups = store.getGroupedEntries();
        expect(groups).toHaveLength(1);
        expect(groups[0].title).toBe('Today');
    });
});
