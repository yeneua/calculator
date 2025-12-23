import React from 'react';

/**
 * SearchBar Props
 */
export interface SearchBarProps {
    /** 검색 쿼리 */
    value: string;
    /** 검색 쿼리 변경 핸들러 */
    onChange: (query: string) => void;
    /** placeholder 텍스트 */
    placeholder?: string;
}

/**
 * 검색 바 컴포넌트
 * 
 * @remarks
 * 히스토리 검색을 위한 입력 필드를 제공합니다.
 * 
 * @example
 * ```tsx
 * <SearchBar 
 *   value={searchQuery}
 *   onChange={setSearchQuery}
 *   placeholder="Search history..."
 * />
 * ```
 */
export const SearchBar: React.FC<SearchBarProps> = ({
    value,
    onChange,
    placeholder = 'Search calculations...',
}) => {
    return (
        <div className="
            relative
            mb-4
        ">
            <span className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                material-symbols-outlined
                text-gray-400
                text-xl
            ">
                search
            </span>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="
                    w-full
                    pl-12
                    pr-4
                    py-3
                    rounded-xl
                    border border-gray-300 dark:border-gray-600
                    bg-white dark:bg-gray-800
                    text-gray-900 dark:text-gray-100
                    placeholder-gray-400 dark:placeholder-gray-500
                    focus:outline-none
                    focus:ring-2
                    focus:ring-primary-500
                    focus:border-transparent
                    transition-all
                "
                aria-label="Search history"
            />
            {value && (
                <button
                    onClick={() => onChange('')}
                    className="
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        text-gray-400
                        hover:text-gray-600 dark:hover:text-gray-300
                        transition-colors
                    "
                    aria-label="Clear search"
                >
                    <span className="material-symbols-outlined text-xl">
                        close
                    </span>
                </button>
            )}
        </div>
    );
};

export default SearchBar;
