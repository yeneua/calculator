import React from 'react';
import { HistoryItem } from '@/components/history/HistoryItem/HistoryItem';
import type { GroupedHistory } from '@/types/history';

/**
 * HistoryList Props
 */
export interface HistoryListProps {
    /** 날짜별로 그룹화된 히스토리 */
    groupedEntries: GroupedHistory[];
    /** 항목 클릭 핸들러 (수식 로드) */
    onLoadExpression: (expression: string) => void;
    /** 항목 삭제 핸들러 */
    onDeleteEntry: (id: string) => void;
}

/**
 * 히스토리 리스트 컴포넌트
 * 
 * @remarks
 * 날짜별로 그룹화된 계산 기록을 표시합니다.
 * 각 항목을 클릭하면 해당 수식을 계산기에 로드할 수 있습니다.
 * 
 * Note: 가상 스크롤은 추후 성능 최적화 단계에서 @tanstack/react-virtual로 구현 예정
 * 현재는 기본 렌더링으로 구현
 * 
 * @example
 * ```tsx
 * <HistoryList 
 *   groupedEntries={groupedHistory}
 *   onLoadExpression={loadToCalculator}
 *   onDeleteEntry={deleteEntry}
 * />
 * ```
 */
export const HistoryList: React.FC<HistoryListProps> = ({
    groupedEntries,
    onLoadExpression,
    onDeleteEntry,
}) => {
    if (groupedEntries.length === 0) {
        return (
            <div className="
                text-center
                py-16
                text-gray-400 dark:text-gray-500
            ">
                <span className="material-symbols-outlined text-6xl mb-4 block">
                    history
                </span>
                <p className="text-lg">No calculation history yet</p>
                <p className="text-sm mt-2">
                    Your calculations will appear here
                </p>
            </div>
        );
    }

    return (
        <div className="
            space-y-6
        ">
            {groupedEntries.map((group) => (
                <div key={group.title}>
                    {/* Group Title */}
                    <h3 className="
                        text-sm
                        font-semibold
                        text-gray-500 dark:text-gray-400
                        uppercase
                        tracking-wide
                        mb-3
                        sticky
                        top-0
                        bg-gray-50 dark:bg-gray-900
                        py-2
                        z-10
                    ">
                        {group.title}
                    </h3>

                    {/* Group Entries */}
                    <div>
                        {group.entries.map((entry) => (
                            <HistoryItem
                                key={entry.id}
                                entry={entry}
                                onClick={onLoadExpression}
                                onDelete={onDeleteEntry}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HistoryList;
