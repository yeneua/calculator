import React from 'react';
import { SearchBar } from '@/components/history/SearchBar/SearchBar';
import { HistoryList } from '@/components/history/HistoryList/HistoryList';
import { useHistoryStore } from '@/store/historyStore';
import { useCalculatorStore } from '@/store/calculatorStore';

/**
 * 히스토리 페이지
 * 
 * @remarks
 * 계산 기록을 날짜별로 그룹화하여 표시하고,
 * 검색 및 관리 기능을 제공합니다.
 * 
 * 관련 FR: FR-11, FR-12, FR-13, FR-14, FR-15
 */
export const HistoryPage: React.FC = () => {
    const {
        searchQuery,
        setSearchQuery,
        removeEntry,
        clearAll,
        getFilteredEntries,
        getGroupedEntries,
    } = useHistoryStore();

    const { appendValue, clear } = useCalculatorStore();

    /**
     * 수식을 계산기에 로드
     */
    const handleLoadExpression = (expression: string) => {
        clear(); // 먼저 현재 수식 클리어
        appendValue(expression);
        // TODO: Navigate back to calculator page when routing is implemented
    };

    /**
     * 항목 삭제
     */
    const handleDeleteEntry = (id: string) => {
        removeEntry(id);
    };

    /**
     * 전체 삭제 확인 후 실행
     */
    const handleClearAll = () => {
        if (confirm('Are you sure you want to clear all history?')) {
            clearAll();
        }
    };

    // 검색 쿼리에 따라 필터링된 엔트리 가져오기
    const filteredEntries = getFilteredEntries();

    // 날짜별 그룹화
    const groupedEntries = searchQuery
        ? [{ title: 'Search Results', entries: filteredEntries }]
        : getGroupedEntries();

    return (
        <div className="
            min-h-screen
            bg-gradient-to-br from-green-50 to-blue-50
            dark:from-gray-900 dark:to-gray-800
            p-4
        ">
            <div className="
                max-w-2xl
                mx-auto
                py-6
            ">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="
                        text-3xl
                        font-bold
                        text-gray-900 dark:text-gray-100
                    ">
                        History
                    </h1>
                    <button
                        onClick={handleClearAll}
                        className="
                            px-4
                            py-2
                            rounded-lg
                            bg-red-500
                            text-white
                            font-semibold
                            hover:bg-red-600
                            active:scale-95
                            transition-all
                            shadow-md
                            hover:shadow-lg
                        "
                        aria-label="Clear all history"
                    >
                        Clear All
                    </button>
                </div>

                {/* Search Bar */}
                <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                />

                {/* History List */}
                <HistoryList
                    groupedEntries={groupedEntries}
                    onLoadExpression={handleLoadExpression}
                    onDeleteEntry={handleDeleteEntry}
                />
            </div>
        </div>
    );
};

export default HistoryPage;
