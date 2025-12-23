import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { evaluateExpression } from '@/lib/calculator/implementations/MathJsEvaluator';
import { formatNumber } from '@/lib/calculator/implementations/NumberFormatter';

/**
 * 계산기 상태 인터페이스
 */
interface CalculatorState {
    expression: string;
    result: string;
    memory: number;
    angleMode: 'DEG' | 'RAD';
    secondMode: boolean; // 2nd 버튼 활성화 여부
    error: string | null;
    isNewCalculation: boolean; // 계산 직후인지 확인 (새 입력 시 리셋용)
}

/**
 * 계산기 액션 인터페이스
 */
interface CalculatorActions {
    appendValue: (value: string) => void;
    calculate: () => void;
    clear: () => void;
    backspace: () => void;
    toggleAngleMode: () => void;
    toggleSecondMode: () => void;

    // 메모리 기능
    memoryAdd: () => void;
    memorySub: () => void;
    memoryRecall: () => void;
    memoryClear: () => void;

    // 계산 엔진 주입 (테스트용)
    // 실제 컴포넌트에서는 기본값 사용
}

// 초기 상태
const initialState: CalculatorState = {
    expression: '',
    result: '0',
    memory: 0,
    angleMode: 'DEG',
    secondMode: false,
    error: null,
    isNewCalculation: false,
};

/**
 * 계산기 스토어
 */
export const useCalculatorStore = create<CalculatorState & CalculatorActions>()(
    persist(
        (set, get) => ({
            ...initialState,

            appendValue: (value: string) => {
                const { expression, isNewCalculation } = get();

                // 계산 직후 숫자가 입력되면 새로운 수식 시작
                // 연산자가 입력되면 결과값에 이어서 연산
                if (isNewCalculation) {
                    const isOperator = /[+\-*/^%]/.test(value);
                    if (isOperator) {
                        // 결과값을 새로운 수식의 시작으로 사용
                        const prevResult = get().result.replace(/,/g, ''); // 포맷팅 제거
                        set({
                            expression: `${prevResult}${value}`,
                            isNewCalculation: false,
                            error: null
                        });
                        return;
                    } else {
                        // 새로운 수식 시작
                        set({
                            expression: value,
                            isNewCalculation: false,
                            error: null,
                            result: '0' // 결과 리셋
                        });
                        return;
                    }
                }

                set({ expression: expression + value, error: null });
            },

            calculate: () => {
                const { expression, angleMode } = get();

                if (!expression) return;

                try {
                    // 수식 평가
                    const rawResult = evaluateExpression(expression, angleMode);

                    // 결과 포맷팅
                    const formattedResult = formatNumber(rawResult, {
                        decimalPlaces: 10,
                        removeTrailingZeros: true,
                        thousandsSeparator: true
                    });

                    set({
                        result: formattedResult,
                        // expression: formattedResult, // 구글 계산기 스타일: 수식 유지, 결과 표시
                        isNewCalculation: true,
                        error: null
                    });
                } catch (error) {
                    let errorMessage = 'Error';
                    if (error instanceof Error) {
                        errorMessage = error.message;
                    }
                    set({ error: errorMessage, result: 'Error' });
                }
            },

            clear: () => {
                set({
                    expression: '',
                    result: '0',
                    error: null,
                    isNewCalculation: false
                });
            },

            backspace: () => {
                const { expression } = get();
                if (expression.length > 0) {
                    set({ expression: expression.slice(0, -1) });
                }
            },

            toggleAngleMode: () => {
                const { angleMode } = get();
                set({ angleMode: angleMode === 'DEG' ? 'RAD' : 'DEG' });
            },

            toggleSecondMode: () => {
                const { secondMode } = get();
                set({ secondMode: !secondMode });
            },

            memoryAdd: () => {
                const { memory, result } = get();
                // 현재 결과값을 파싱하여 더함
                const currentValue = parseFloat(result.replace(/,/g, ''));
                if (!isNaN(currentValue)) {
                    set({ memory: memory + currentValue, isNewCalculation: true });
                }
            },

            memorySub: () => {
                const { memory, result } = get();
                const currentValue = parseFloat(result.replace(/,/g, ''));
                if (!isNaN(currentValue)) {
                    set({ memory: memory - currentValue, isNewCalculation: true });
                }
            },

            memoryRecall: () => {
                const { memory, isNewCalculation, expression } = get();
                const memoryStr = memory.toString();

                if (isNewCalculation) {
                    set({
                        expression: memoryStr,
                        isNewCalculation: false,
                        error: null,
                        result: '0'
                    });
                } else {
                    set({ expression: expression + memoryStr });
                }
            },

            memoryClear: () => {
                set({ memory: 0 });
            },
        }),
        {
            name: 'calculator-storage',
            // persist할 필드 선택 (선택 사항)
            partialize: (state) => ({
                memory: state.memory,
                angleMode: state.angleMode,
                // expression, result는 유지하지 않는 것이 일반적이나 요구사항에 따라 다름
                // 여기서는 메모리와 설정만 유지
            }),
        }
    )
);
