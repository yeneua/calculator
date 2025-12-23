import React, { useState, useEffect } from 'react';
import { convert } from '@/lib/converter/implementations/MathJsConverter';

/**
 * ConversionCard Props
 */
export interface ConversionCardProps {
    /** 단위 카테고리 */
    category: string;
    /** 사용 가능한 단위 목록 */
    availableUnits: string[];
}

/**
 * 단위 표시 이름 맵 (더 읽기 쉬운 이름)
 */
const UNIT_LABELS: Record<string, string> = {
    // Length
    meter: 'm',
    kilometer: 'km',
    centimeter: 'cm',
    millimeter: 'mm',
    mile: 'mi',
    yard: 'yd',
    feet: 'ft',
    inch: 'in',
    // Mass
    kilogram: 'kg',
    gram: 'g',
    milligram: 'mg',
    ton: 't',
    pound: 'lb',
    ounce: 'oz',
    // Temperature
    celsius: '°C',
    fahrenheit: '°F',
    kelvin: 'K',
    // Time
    second: 's',
    millisecond: 'ms',
    minute: 'min',
    hour: 'h',
    day: 'd',
    week: 'wk',
    month: 'mo',
    year: 'yr',
    // Volume
    liter: 'L',
    milliliter: 'mL',
    cubicMeter: 'm³',
    gallon: 'gal',
    quart: 'qt',
    pint: 'pt',
    cup: 'cup',
    fluidOunce: 'fl oz',
    // Area
    squareMeter: 'm²',
    squareKilometer: 'km²',
    squareCentimeter: 'cm²',
    squareFoot: 'ft²',
    squareInch: 'in²',
    squareMile: 'mi²',
    hectare: 'ha',
    acre: 'ac',
};

/**
 * 단위 변환 카드 컴포넌트
 * 
 * @remarks
 * 입력값과 결과값을 표시하고, 단위를 선택할 수 있는 카드입니다.
 * 실시간으로 변환을 수행합니다.
 * 
 * @example
 * ```tsx
 * <ConversionCard 
 *   category="length"
 *   availableUnits={['meter', 'kilometer', 'feet']}
 * />
 * ```
 */
export const ConversionCard: React.FC<ConversionCardProps> = ({
    category,
    availableUnits,
}) => {
    const [inputValue, setInputValue] = useState('1');
    const [fromUnit, setFromUnit] = useState(availableUnits[0] || '');
    const [toUnit, setToUnit] = useState(availableUnits[1] || availableUnits[0] || '');
    const [result, setResult] = useState('');

    // 카테고리 변경 시 기본 단위로 리셋
    useEffect(() => {
        setFromUnit(availableUnits[0] || '');
        setToUnit(availableUnits[1] || availableUnits[0] || '');
        setInputValue('1');
    }, [category, availableUnits]);

    // 변환 수행
    useEffect(() => {
        if (!inputValue || !fromUnit || !toUnit) {
            setResult('');
            return;
        }

        const value = parseFloat(inputValue);
        if (isNaN(value)) {
            setResult('Invalid input');
            return;
        }

        try {
            const converted = convert(value, fromUnit, toUnit);
            // 소수점 10자리까지, 후행 0 제거
            const formatted = parseFloat(converted.toFixed(10)).toString();
            setResult(formatted);
        } catch (error) {
            setResult('Error');
        }
    }, [inputValue, fromUnit, toUnit]);

    /**
     * 입력/출력 단위 스왑
     */
    const handleSwap = () => {
        setFromUnit(toUnit);
        setToUnit(fromUnit);
    };

    /**
     * 결과 복사
     */
    const handleCopyResult = () => {
        if (result && result !== 'Error' && result !== 'Invalid input') {
            navigator.clipboard.writeText(result);
        }
    };

    return (
        <div className="space-y-4">
            {/* Input Card */}
            <div className="
                bg-white dark:bg-gray-800
                rounded-2xl
                p-6
                shadow-lg
                border border-gray-200 dark:border-gray-700
            ">
                <label className="
                    block
                    text-sm
                    font-medium
                    text-gray-500 dark:text-gray-400
                    mb-2
                ">
                    From
                </label>
                <div className="flex gap-3 items-center">
                    <input
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="
                            flex-1
                            text-3xl
                            font-bold
                            bg-transparent
                            text-gray-900 dark:text-gray-100
                            focus:outline-none
                            border-b-2 border-gray-300 dark:border-gray-600
                            focus:border-primary-500
                            transition-colors
                            pb-2
                        "
                        placeholder="Enter value"
                    />
                    <select
                        value={fromUnit}
                        onChange={(e) => setFromUnit(e.target.value)}
                        className="
                            px-4
                            py-2
                            rounded-lg
                            bg-gray-100 dark:bg-gray-700
                            text-gray-900 dark:text-gray-100
                            font-semibold
                            focus:outline-none
                            focus:ring-2
                            focus:ring-primary-500
                            cursor-pointer
                        "
                    >
                        {availableUnits.map((unit) => (
                            <option key={unit} value={unit}>
                                {UNIT_LABELS[unit] || unit}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
                <button
                    onClick={handleSwap}
                    className="
                        w-14
                        h-14
                        flex
                        items-center
                        justify-center
                        rounded-full
                        bg-gray-400
                        text-white
                        hover:bg-gray-500
                        active:scale-95
                        transition-all
                        shadow-md
                        hover:shadow-lg
                    "
                    aria-label="Swap units"
                >
                    <span className="material-symbols-outlined">
                        swap_vert
                    </span>
                </button>
            </div>

            {/* Result Card */}
            <div className="
                bg-white dark:bg-gray-800
                rounded-2xl
                p-6
                shadow-lg
                border border-gray-200 dark:border-gray-700
            ">
                <label className="
                    block
                    text-sm
                    font-medium
                    text-gray-500 dark:text-gray-400
                    mb-2
                ">
                    To
                </label>
                <div className="flex gap-3 items-center">
                    <div className="
                        flex-1
                        text-3xl
                        font-bold
                        text-primary-500 dark:text-primary-400
                        pb-2
                    ">
                        {result || '0'}
                    </div>
                    <select
                        value={toUnit}
                        onChange={(e) => setToUnit(e.target.value)}
                        className="
                            px-4
                            py-2
                            rounded-lg
                            bg-gray-100 dark:bg-gray-700
                            text-gray-900 dark:text-gray-100
                            font-semibold
                            focus:outline-none
                            focus:ring-2
                            focus:ring-primary-500
                            cursor-pointer
                        "
                    >
                        {availableUnits.map((unit) => (
                            <option key={unit} value={unit}>
                                {UNIT_LABELS[unit] || unit}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={handleCopyResult}
                        className="
                            p-2
                            rounded-lg
                            text-gray-400
                            hover:text-gray-600 dark:hover:text-gray-300
                            hover:bg-gray-100 dark:hover:bg-gray-700
                            transition-all
                        "
                        aria-label="Copy result"
                    >
                        <span className="material-symbols-outlined text-xl">
                            content_copy
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConversionCard;
