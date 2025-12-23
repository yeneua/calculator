import React, { useCallback } from 'react';
import { Display } from '@/components/common/Display/Display';
import { ModeSelector } from '@/components/calculator/ModeSelector/ModeSelector';
import { FunctionGrid } from '@/components/calculator/FunctionGrid/FunctionGrid';
import { Keypad } from '@/components/calculator/Keypad/Keypad';
import { useCalculatorStore } from '@/store/calculatorStore';
import { useHistoryStore } from '@/store/historyStore';

/**
 * 과학 계산기 페이지
 * 
 * @remarks
 * 기본 사칙연산과 과학 함수를 모두 지원하는 계산기 페이지입니다.
 * 삼각함수, 로그, 거듭제곱 등의 고급 수학 함수를 제공합니다.
 * DEG/RAD 모드와 2nd 함수 모드를 지원합니다.
 * 
 * 관련 FR: FR-4, FR-5, FR-6, FR-7, FR-8, FR-9
 */
export const ScientificPage: React.FC = () => {
    const {
        expression,
        result,
        error,
        angleMode,
        secondMode,
        appendValue,
        calculate,
        clear,
        backspace,
        toggleAngleMode,
        toggleSecondMode,
        memoryAdd,
        memorySub,
        memoryRecall,
        memoryClear,
        memory,
    } = useCalculatorStore();

    const { addEntry } = useHistoryStore();

    /**
     * 버튼 클릭 핸들러
     */
    const handleButtonClick = useCallback(
        (value: string) => {
            switch (value) {
                case 'C':
                    clear();
                    break;
                case 'backspace':
                    backspace();
                    break;
                case '=':
                    const currentExpression = expression;
                    calculate();
                    setTimeout(() => {
                        const state = useCalculatorStore.getState();
                        if (!state.error && currentExpression) {
                            addEntry(currentExpression, state.result);
                        }
                    }, 0);
                    break;
                case 'M+':
                    memoryAdd();
                    break;
                case 'M-':
                    memorySub();
                    break;
                case 'MR':
                    memoryRecall();
                    break;
                case 'MC':
                    memoryClear();
                    break;
                default:
                    appendValue(value);
                    break;
            }
        },
        [
            expression,
            appendValue,
            calculate,
            clear,
            backspace,
            memoryAdd,
            memorySub,
            memoryRecall,
            memoryClear,
            addEntry,
        ]
    );

    return (
        <div className="
            min-h-screen
            bg-gradient-to-br from-purple-50 to-blue-50
            dark:from-gray-900 dark:to-gray-800
            flex
            items-center
            justify-center
            p-4
        ">
            <div className="
                w-full
                max-w-2xl
            ">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="
                        text-3xl
                        font-bold
                        text-gray-900 dark:text-gray-100
                    ">
                        Scientific Calculator
                    </h1>
                    {memory !== 0 && (
                        <div className="
                            px-3
                            py-1
                            rounded-lg
                            bg-blue-100 dark:bg-blue-900
                            text-blue-700 dark:text-blue-300
                            text-sm
                            font-medium
                        ">
                            M: {memory}
                        </div>
                    )}
                </div>

                {/* Display */}
                <Display
                    expression={expression}
                    result={result}
                    error={error}
                />

                {/* Mode Selector */}
                <ModeSelector
                    angleMode={angleMode}
                    onToggleAngleMode={toggleAngleMode}
                    secondMode={secondMode}
                    onToggleSecondMode={toggleSecondMode}
                />

                {/* Function Grid */}
                <FunctionGrid
                    onButtonClick={handleButtonClick}
                    secondMode={secondMode}
                />

                {/* Memory & Additional Functions */}
                <div className="
                    w-full
                    bg-white dark:bg-gray-900
                    rounded-2xl
                    shadow-lg
                    p-4
                    mb-4
                    border border-gray-200 dark:border-gray-700
                ">
                    <div className="grid grid-cols-4 gap-3">
                        <button
                            onClick={() => handleButtonClick('MC')}
                            className="
                                px-4 py-3
                                rounded-lg
                                bg-gray-200 dark:bg-gray-700
                                text-gray-700 dark:text-gray-300
                                font-semibold
                                hover:bg-gray-300 dark:hover:bg-gray-600
                                active:scale-95
                                transition-all
                            "
                        >
                            MC
                        </button>
                        <button
                            onClick={() => handleButtonClick('MR')}
                            className="
                                px-4 py-3
                                rounded-lg
                                bg-gray-200 dark:bg-gray-700
                                text-gray-700 dark:text-gray-300
                                font-semibold
                                hover:bg-gray-300 dark:hover:bg-gray-600
                                active:scale-95
                                transition-all
                            "
                        >
                            MR
                        </button>
                        <button
                            onClick={() => handleButtonClick('M+')}
                            className="
                                px-4 py-3
                                rounded-lg
                                bg-gray-200 dark:bg-gray-700
                                text-gray-700 dark:text-gray-300
                                font-semibold
                                hover:bg-gray-300 dark:hover:bg-gray-600
                                active:scale-95
                                transition-all
                            "
                        >
                            M+
                        </button>
                        <button
                            onClick={() => handleButtonClick('M-')}
                            className="
                                px-4 py-3
                                rounded-lg
                                bg-gray-200 dark:bg-gray-700
                                text-gray-700 dark:text-gray-300
                                font-semibold
                                hover:bg-gray-300 dark:hover:bg-gray-600
                                active:scale-95
                                transition-all
                            "
                        >
                            M-
                        </button>
                    </div>
                </div>

                {/* Standard Keypad */}
                <Keypad
                    onButtonClick={handleButtonClick}
                />
            </div>
        </div>
    );
};

export default ScientificPage;
