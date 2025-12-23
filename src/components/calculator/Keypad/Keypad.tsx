import React from 'react';
import { Button } from '@/components/common/Button/Button';
import type { ButtonVariant } from '@/components/common/Button/Button';

/**
 * 키패드 컴포넌트 Props
 */
export interface KeypadProps {
    /** 버튼 클릭 핸들러 */
    onButtonClick: (value: string) => void;
    /** 비활성화 여부 */
    disabled?: boolean;
}

/**
 * 버튼 정의 인터페이스
 */
interface ButtonDef {
    value: string;
    label?: string;
    variant: ButtonVariant;
    icon?: string;
    wide?: boolean;
}

/**
 * 표준 계산기 버튼 레이아웃
 */
const buttonLayout: ButtonDef[][] = [
    [
        { value: 'C', variant: 'special', label: 'C' },
        { value: '', variant: 'special', icon: 'backspace' },
        { value: '%', variant: 'operator', label: '%' },
        { value: '/', variant: 'operator', label: '÷' },
    ],
    [
        { value: '7', variant: 'number', label: '7' },
        { value: '8', variant: 'number', label: '8' },
        { value: '9', variant: 'number', label: '9' },
        { value: '*', variant: 'operator', label: '×' },
    ],
    [
        { value: '4', variant: 'number', label: '4' },
        { value: '5', variant: 'number', label: '5' },
        { value: '6', variant: 'number', label: '6' },
        { value: '-', variant: 'operator', label: '-' },
    ],
    [
        { value: '1', variant: 'number', label: '1' },
        { value: '2', variant: 'number', label: '2' },
        { value: '3', variant: 'number', label: '3' },
        { value: '+', variant: 'operator', label: '+' },
    ],
    [
        { value: '0', variant: 'number', label: '0', wide: true },
        { value: '.', variant: 'number', label: '.' },
        { value: '=', variant: 'operator', label: '=' },
    ],
];

/**
 * 표준 계산기 키패드 컴포넌트
 * 
 * @remarks
 * 4x5 그리드 레이아웃의 표준 계산기 키패드입니다.
 * 숫자(0-9), 연산자(+, -, ×, ÷), 특수 버튼(C, ⌫, %, =)을 포함합니다.
 * 
 * @example
 * ```tsx
 * <Keypad 
 *   onButtonClick={handleButtonClick}
 *   disabled={false}
 * />
 * ```
 */
export const Keypad: React.FC<KeypadProps> = ({
    onButtonClick,
    disabled = false,
}) => {
    return (
        <div className="
            w-full
            bg-white dark:bg-gray-900
            rounded-2xl
            shadow-lg
            p-4
            border border-gray-200 dark:border-gray-700
        ">
            <div className="grid gap-3">
                {buttonLayout.map((row, rowIndex) => (
                    <div
                        key={rowIndex}
                        className="grid grid-cols-4 gap-3"
                    >
                        {row.map((button, colIndex) => (
                            <Button
                                key={`${rowIndex}-${colIndex}`}
                                value={button.value}
                                label={button.label}
                                variant={button.variant}
                                icon={button.icon}
                                wide={button.wide}
                                onClick={onButtonClick}
                                disabled={disabled}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Keypad;
