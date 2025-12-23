import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { HistoryManager } from '@/lib/storage/HistoryManager';
import { LocalStorageRepository } from '@/lib/storage/implementations/LocalStorageRepository';
import type { HistoryEntry, GroupedHistory } from '@/types/history';

/**
 * 히스토리 상태 인터페이스
 */
interface HistoryState {
    entries: HistoryEntry[];
    searchQuery: string;
}

/**
 * 히스토리 액션 인터페이스
 */
interface HistoryActions {
    addEntry: (expression: string, result: string) => void;
    removeEntry: (id: string) => void;
    clearAll: () => void;
    setSearchQuery: (query: string) => void;
    getFilteredEntries: () => HistoryEntry[];
    getGroupedEntries: () => GroupedHistory[];
}

// 초기 상태
const initialState: HistoryState = {
    entries: [],
    searchQuery: '',
};

// 히스토리 매니저 인스턴스 생성
const historyRepository = new LocalStorageRepository<HistoryEntry[]>('calculator-history');
const historyManager = new HistoryManager(historyRepository);

/**
 * 히스토리 스토어
 * 
 * @remarks
 * 계산 히스토리를 관리하고, 검색 및 날짜별 그룹화 기능을 제공합니다.
 * HistoryManager를 통해 비즈니스 로직을 처리합니다.
 * 
 * 관련 FR: FR-11 ~ FR-15
 */
export const useHistoryStore = create<HistoryState & HistoryActions>()(
    persist(
        (set, get) => ({
            ...initialState,

            /**
             * 히스토리 엔트리 추가
             * 
             * @param expression - 계산 수식
             * @param result - 계산 결과
             */
            addEntry: (expression: string, result: string) => {
                const newEntry = historyManager.addHistory(expression, result);
                const entries = historyManager.search(''); // 전체 히스토리 가져오기
                set({ entries });
            },

            /**
             * 특정 엔트리 삭제
             * 
             * @param id - 삭제할 엔트리의 ID
             */
            removeEntry: (id: string) => {
                historyManager.removeEntry(id);
                const entries = historyManager.search('');
                set({ entries });
            },

            /**
             * 모든 히스토리 삭제
             */
            clearAll: () => {
                historyManager.clearHistory();
                set({ entries: [], searchQuery: '' });
            },

            /**
             * 검색 쿼리 설정
             * 
             * @param query - 검색 쿼리 문자열
             */
            setSearchQuery: (query: string) => {
                set({ searchQuery: query });
            },

            /**
             * 검색 쿼리로 필터링된 엔트리 반환
             * 
             * @returns 필터링된 히스토리 엔트리 배열
             */
            getFilteredEntries: () => {
                const { searchQuery } = get();
                if (!searchQuery.trim()) {
                    return get().entries;
                }
                return historyManager.search(searchQuery);
            },

            /**
             * 날짜별로 그룹화된 엔트리 반환
             * 
             * @returns 날짜별로 그룹화된 히스토리
             */
            getGroupedEntries: () => {
                return historyManager.getGroupedHistory();
            },
        }),
        {
            name: 'history-storage',
            // 스토어 초기화 시 localStorage에서 히스토리 로드
            onRehydrateStorage: () => (state) => {
                if (state) {
                    const entries = historyManager.search('');
                    state.entries = entries;
                }
            },
        }
    )
);
