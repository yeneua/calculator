import React from 'react';
import type { HistoryEntry } from '@/types/history';

/**
 * HistoryItem Props
 */
export interface HistoryItemProps {
    /** 히스토리 엔트리 데이터 */
    entry: HistoryEntry;
    /** 클릭 핸들러 (수식 로드) */
    onClick: (expression: string) => void;
    /** 삭제 핸들러 */
    onDelete: (id: string) => void;
}

/**
 * 히스토리 아이템 컴포넌트
 * 
 * @remarks
 * 개별 계산 기록을 표시하는 컴포넌트입니다.
 * 클릭하면 해당 수식을 계산기에 로드할 수 있습니다.
 * 
 * @example
 * ```tsx
 * <HistoryItem 
 *   entry={entry}
 *   onClick={loadExpression}
 *   onDelete={deleteEntry}
 * />
 * ```
 */
export const HistoryItem: React.FC<HistoryItemProps> = ({
    entry,
    onClick,
    onDelete,
}) => {
    const formatTime = (timestamp: number) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="
            group
            relative
            bg-white dark:bg-gray-800
            rounded-lg
            p-4
            mb-2
            border border-gray-200 dark:border-gray-700
            hover:border-primary-500 dark:hover:border-primary-400
            hover:shadow-md
            transition-all
            cursor-pointer
        "
            onClick={() => onClick(entry.expression)}
        >
            {/* Time */}
            <div className="
                text-xs
                text-gray-400 dark:text-gray-500
                mb-1
            ">
                {formatTime(entry.timestamp)}
            </div>

            {/* Expression */}
            <div className="
                text-sm
                text-gray-600 dark:text-gray-400
                mb-1
                font-medium
            ">
                {entry.expression}
            </div>

            {/* Result */}
            <div className="
                text-lg
                font-bold
                text-gray-900 dark:text-gray-100
            ">
                = {entry.result}
            </div>

            {/* Delete Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(entry.id);
                }}
                className="
                    absolute
                    top-3
                    right-3
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity
                    text-gray-400
                    hover:text-red-500 dark:hover:text-red-400
                    p-1
                "
                aria-label="Delete entry"
            >
                <span className="material-symbols-outlined text-xl">
                    delete
                </span>
            </button>
        </div>
    );
};

export default HistoryItem;
