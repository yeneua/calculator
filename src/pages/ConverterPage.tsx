import React, { useState } from 'react';
import { CategoryTabs } from '@/components/converter/CategoryTabs/CategoryTabs';
import { ConversionCard } from '@/components/converter/ConversionCard/ConversionCard';
import type { UnitCategory } from '@/lib/converter/interfaces/UnitConverter';
import {
    LENGTH_UNITS,
    MASS_UNITS,
    TIME_UNITS,
    VOLUME_UNITS,
    AREA_UNITS,
} from '@/lib/converter/units';

/**
 * 카테고리별 사용 가능한 단위
 */
const CATEGORY_UNITS: Record<UnitCategory, string[]> = {
    length: Object.keys(LENGTH_UNITS),
    mass: Object.keys(MASS_UNITS),
    temperature: ['celsius', 'fahrenheit', 'kelvin'],
    time: Object.keys(TIME_UNITS),
    volume: Object.keys(VOLUME_UNITS),
    area: Object.keys(AREA_UNITS),
};

/**
 * 단위 변환기 페이지
 * 
 * @remarks
 * 6개 카테고리의 단위 변환을 지원하는 페이지입니다.
 * 카테고리: 길이, 질량, 온도, 시간, 부피, 면적
 * 
 * 관련 FR: FR-18, FR-19, FR-20, FR-21
 */
export const ConverterPage: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<UnitCategory>('length');

    const availableUnits = CATEGORY_UNITS[activeCategory] || [];

    return (
        <div className="
            min-h-screen
            bg-gradient-to-br from-orange-50 to-pink-50
            dark:from-gray-900 dark:to-gray-800
            p-4
        ">
            <div className="
                max-w-2xl
                mx-auto
                py-6
            ">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="
                        text-3xl
                        font-bold
                        text-gray-900 dark:text-gray-100
                    ">
                        Unit Converter
                    </h1>
                    <p className="
                        text-gray-500 dark:text-gray-400
                        mt-2
                    ">
                        Convert between different units
                    </p>
                </div>

                {/* Category Tabs */}
                <CategoryTabs
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                />

                {/* Conversion Card */}
                <ConversionCard
                    key={activeCategory} // Force re-render on category change
                    category={activeCategory}
                    availableUnits={availableUnits}
                />

                {/* Info */}
                <div className="
                    mt-6
                    text-center
                    text-sm
                    text-gray-500 dark:text-gray-400
                ">
                    <p>
                        Select a category and enter a value to convert
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ConverterPage;
