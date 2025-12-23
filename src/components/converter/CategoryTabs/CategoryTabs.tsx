import React from 'react';
import type { UnitCategory } from '@/lib/converter/interfaces/UnitConverter';

/**
 * CategoryTabs Props
 */
export interface CategoryTabsProps {
    /** 현재 선택된 카테고리 */
    activeCategory: UnitCategory;
    /** 카테고리 변경 핸들러 */
    onCategoryChange: (category: UnitCategory) => void;
}

/**
 * 카테고리 표시 정보
 */
const CATEGORY_INFO: Record<UnitCategory, { label: string; icon: string }> = {
    length: { label: 'Length', icon: 'straighten' },
    mass: { label: 'Mass', icon: 'scale' },
    temperature: { label: 'Temp', icon: 'thermostat' },
    time: { label: 'Time', icon: 'schedule' },
    volume: { label: 'Volume', icon: 'water_drop' },
    area: { label: 'Area', icon: 'square_foot' },
};

/**
 * 카테고리 탭 컴포넌트
 * 
 * @remarks
 * 단위 변환기의 카테고리를 선택하는 가로 스크롤 탭입니다.
 * 
 * @example
 * ```tsx
 * <CategoryTabs 
 *   activeCategory="length"
 *   onCategoryChange={setCategory}
 * />
 * ```
 */
export const CategoryTabs: React.FC<CategoryTabsProps> = ({
    activeCategory,
    onCategoryChange,
}) => {
    const categories: UnitCategory[] = [
        'length',
        'mass',
        'temperature',
        'time',
        'volume',
        'area',
    ];

    return (
        <div className="
            w-full
            overflow-x-auto
            scrollbar-hide
            mb-4
        ">
            <div className="
                flex
                gap-2
                min-w-max
                pb-2
            ">
                {categories.map((category) => {
                    const info = CATEGORY_INFO[category];
                    const isActive = category === activeCategory;

                    return (
                        <button
                            key={category}
                            onClick={() => onCategoryChange(category)}
                            className={`
                                flex
                                items-center
                                gap-2
                                px-4
                                py-2
                                rounded-lg
                                font-semibold
                                text-sm
                                transition-all
                                whitespace-nowrap
                                ${isActive
                                    ? 'bg-gray-200 shadow-md'
                                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                                }
                                hover:shadow-lg
                                active:scale-95
                            `}
                            aria-label={`Select ${info.label} category`}
                            aria-pressed={isActive}
                        >
                            <span className="material-symbols-outlined text-lg">
                                {info.icon}
                            </span>
                            <span>{info.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default CategoryTabs;
