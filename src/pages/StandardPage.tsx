import React, { useCallback } from 'react';
import { Display } from '@/components/common/Display/Display';
import { Keypad } from '@/components/calculator/Keypad/Keypad';
import { useCalculatorStore } from '@/store/calculatorStore';
import { useHistoryStore } from '@/store/historyStore';

/**
 * 표준 계산기 페이지
 * 
 * @remarks
 * 기본 사칙연산을 수행하는 표준 계산기 페이지입니다.
 * Display와 Keypad 컴포넌트를 통합하고, Calculator Store와 연동합니다.
 * 계산 완료 시 자동으로 히스토리에 저장됩니다.
 * 
 * 관련 FR: FR-1, FR-2, FR-3
 */
export const StandardPage: React.FC = () => {
    const {
        expression,
        result,
        error,
        appendValue,
        calculate,
        clear,
        backspace,
    } = useCalculatorStore();

    const { addEntry } = useHistoryStore();

    /**
     * 버튼 클릭 핸들러
     * 
     * @param value - 버튼 값
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
                    // 계산 전 수식 저장
                    const currentExpression = expression;
                    calculate();
                    // 계산 후 히스토리에 저장
                    // Note: calculate()는 동기적이므로 즉시 result가 업데이트됨
                    // 하지만 Zustand는 비동기적으로 업데이트될 수 있으므로
                    // 다음 렌더링 사이클에서 저장하는 것이 안전함
                    setTimeout(() => {
                        const state = useCalculatorStore.getState();
                        if (!state.error && currentExpression) {
                            addEntry(currentExpression, state.result);
                        }
                    }, 0);
                    break;
                default:
                    appendValue(value);
                    break;
            }
        },
        [expression, appendValue, calculate, clear, backspace, addEntry]
    );

    return (
        <div className="
            min-h-screen
            bg-gradient-to-br from-blue-50 to-purple-50
            dark:from-gray-900 dark:to-gray-800
            flex
            items-center
            justify-center
            p-4
        ">
            <div className="
                w-full
                max-w-md
            ">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="
                        text-3xl
                        font-bold
                        text-gray-900 dark:text-gray-100
                        text-center
                    ">
                        Calculator
                    </h1>
                </div>

                {/* Display */}
                <Display
                    expression={expression}
                    result={result}
                    error={error}
                />

                {/* Keypad */}
                <Keypad
                    onButtonClick={handleButtonClick}
                />
            </div>
        </div>
    );
};

export default StandardPage;
