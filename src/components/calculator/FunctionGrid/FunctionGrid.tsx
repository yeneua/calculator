import React from 'react';
import { Button } from '@/components/common/Button/Button';
import type { ButtonVariant } from '@/components/common/Button/Button';

/**
 * FunctionGrid Props
 */
export interface FunctionGridProps {
    /** 버튼 클릭 핸들러 */
    onButtonClick: (value: string) => void;
    /** 2nd 모드 활성화 여부 */
    secondMode: boolean;
    /** 비활성화 여부 */
    disabled?: boolean;
}

/**
 * 함수 버튼 정의
 */
interface FunctionButtonDef {
    value: string;
    label: string;
    secondLabel?: string; // 2nd 모드에서 표시될 레이블
    secondValue?: string; // 2nd 모드에서 사용될 값
    variant: ButtonVariant;
}

/**
 * 과학 함수 버튼 레이아웃
 */
const functionLayout: FunctionButtonDef[][] = [
    [
        { value: 'sin(', label: 'sin', secondValue: 'asin(', secondLabel: 'sin⁻¹', variant: 'function' },
        { value: 'cos(', label: 'cos', secondValue: 'acos(', secondLabel: 'cos⁻¹', variant: 'function' },
        { value: 'tan(', label: 'tan', secondValue: 'atan(', secondLabel: 'tan⁻¹', variant: 'function' },
        { value: 'ln(', label: 'ln', secondValue: 'exp(', secondLabel: 'eˣ', variant: 'function' },
    ],
    [
        { value: 'log(', label: 'log', secondValue: '10^', secondLabel: '10ˣ', variant: 'function' },
        { value: 'sqrt(', label: '√', secondValue: '^2', secondLabel: 'x²', variant: 'function' },
        { value: '^', label: 'xʸ', secondValue: '^(1/', secondLabel: 'ʸ√x', variant: 'function' },
        { value: '!', label: 'x!', secondValue: 'abs(', secondLabel: '|x|', variant: 'function' },
    ],
    [
        { value: 'pi', label: 'π', secondValue: 'e', secondLabel: 'e', variant: 'function' },
        { value: '(', label: '(', variant: 'special' },
        { value: ')', label: ')', variant: 'special' },
        { value: 'mod', label: 'mod', secondValue: 'gcd(', secondLabel: 'gcd', variant: 'function' },
    ],
];

/**
 * 과학 함수 그리드 컴포넌트
 * 
 * @remarks
 * 삼각함수, 로그, 거듭제곱 등의 과학 함수 버튼을 제공합니다.
 * 2nd 모드에서 역함수 및 추가 함수에 접근할 수 있습니다.
 * 
 * @example
 * ```tsx
 * <FunctionGrid 
 *   onButtonClick={handleButtonClick}
 *   secondMode={false}
 * />
 * ```
 */
export const FunctionGrid: React.FC<FunctionGridProps> = ({
    onButtonClick,
    secondMode,
    disabled = false,
}) => {
    return (
        <div className="
            w-full
            bg-white dark:bg-gray-900
            rounded-2xl
            shadow-lg
            p-4
            mb-4
            border border-gray-200 dark:border-gray-700
        ">
            <div className="grid gap-3">
                {functionLayout.map((row, rowIndex) => (
                    <div
                        key={rowIndex}
                        className="grid grid-cols-4 gap-3"
                    >
                        {row.map((button, colIndex) => {
                            const currentValue = secondMode && button.secondValue
                                ? button.secondValue
                                : button.value;

                            const currentLabel = secondMode && button.secondLabel
                                ? button.secondLabel
                                : button.label;

                            return (
                                <Button
                                    key={`${rowIndex}-${colIndex}`}
                                    value={currentValue}
                                    label={currentLabel}
                                    variant={button.variant}
                                    onClick={onButtonClick}
                                    disabled={disabled}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FunctionGrid;
