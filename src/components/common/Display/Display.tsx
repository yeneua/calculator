import React from 'react';

/**
 * 디스플레이 컴포넌트 Props
 */
export interface DisplayProps {
    /** 현재 입력된 수식 */
    expression: string;
    /** 계산 결과 */
    result: string | number;
    /** 에러 메시지 */
    error: string | null;
}

/**
 * 계산기 디스플레이 컴포넌트
 * 
 * @remarks
 * 계산기의 수식과 결과를 표시하는 컴포넌트입니다.
 * 에러 상태도 표시할 수 있습니다.
 * 
 * @example
 * ```tsx
 * <Display 
 *   expression="2 + 3" 
 *   result="5" 
 *   error={null} 
 * />
 * ```
 */
export const Display: React.FC<DisplayProps> = ({
    expression,
    result,
    error,
}) => {
    const displayResult = error || result.toString();
    const hasError = error !== null;

    return (
        <div className="
            w-full
            bg-white dark:bg-gray-900
            rounded-2xl
            shadow-lg
            p-6
            mb-4
            border border-gray-200 dark:border-gray-700
        ">
            {/* Expression Display */}
            <div className="
                text-right
                text-gray-500 dark:text-gray-400
                text-sm
                font-medium
                mb-2
                min-h-[24px]
                overflow-x-auto
                whitespace-nowrap
                scrollbar-hide
            ">
                {expression || '\u00A0'}
            </div>

            {/* Result Display */}
            <div className={`
                text-right
                text-4xl
                font-bold
                overflow-x-auto
                whitespace-nowrap
                scrollbar-hide
                ${hasError
                    ? 'text-red-500 dark:text-red-400'
                    : 'text-gray-900 dark:text-gray-100'
                }
            `}>
                {displayResult || '0'}
            </div>
        </div>
    );
};

export default Display;
