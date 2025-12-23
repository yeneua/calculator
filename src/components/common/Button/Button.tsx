import React from 'react';

/**
 * 버튼 색상 변형
 */
export type ButtonVariant = 'number' | 'operator' | 'function' | 'special';

/**
 * 버튼 컴포넌트 Props
 */
export interface ButtonProps {
    /** 버튼 스타일 변형 */
    variant: ButtonVariant;
    /** 버튼 값 (클릭 시 전달될 값) */
    value: string;
    /** 클릭 핸들러 */
    onClick: (value: string) => void;
    /** 표시할 텍스트 (기본값: value) */
    label?: string;
    /** Material Symbols 아이콘 이름 */
    icon?: string;
    /** 비활성화 여부 */
    disabled?: boolean;
    /** 추가 CSS 클래스 */
    className?: string;
    /** 넓은 버튼 (2칸 차지) */
    wide?: boolean;
}

/**
 * Variant별 스타일 맵
 */
const variantStyles: Record<ButtonVariant, string> = {
    number: `
        bg-gray-100 dark:bg-gray-800 
        text-gray-900 dark:text-gray-100
        hover:bg-gray-200 dark:hover:bg-gray-700
        active:bg-gray-300 dark:active:bg-gray-600
    `,
    operator: `
        bg-primary-500 dark:bg-primary-600
        text-white
        hover:bg-primary-600 dark:hover:bg-primary-700
        active:bg-primary-700 dark:active:bg-primary-800
    `,
    function: `
        bg-purple-500 dark:bg-purple-600
        text-white
        hover:bg-purple-600 dark:hover:bg-purple-700
        active:bg-purple-700 dark:active:bg-purple-800
    `,
    special: `
        bg-gray-300 dark:bg-gray-700
        text-gray-700 dark:text-gray-200
        hover:bg-gray-400 dark:hover:bg-gray-600
        active:bg-gray-500 dark:active:bg-gray-500
    `,
};

/**
 * 계산기 버튼 컴포넌트
 * 
 * @remarks
 * 계산기에서 사용되는 재사용 가능한 버튼 컴포넌트입니다.
 * 4가지 variant를 지원하며, 아이콘과 텍스트를 모두 표시할 수 있습니다.
 * 
 * @example
 * ```tsx
 * <Button variant="number" value="1" onClick={handleClick} />
 * <Button variant="operator" value="+" label="+" onClick={handleClick} />
 * <Button variant="special" value="C" icon="backspace" onClick={handleClick} />
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
    variant,
    value,
    onClick,
    label,
    icon,
    disabled = false,
    className = '',
    wide = false,
}) => {
    const handleClick = () => {
        if (!disabled) {
            onClick(value);
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={disabled}
            className={`
                ${variantStyles[variant]}
                ${wide ? 'col-span-2' : ''}
                ${className}
                rounded-xl
                font-semibold
                text-lg
                transition-all
                duration-150
                active:scale-95
                disabled:opacity-50
                disabled:cursor-not-allowed
                flex
                items-center
                justify-center
                gap-2
                min-h-[60px]
                shadow-sm
                hover:shadow-md
            `}
            aria-label={label || value}
        >
            {icon && (
                <span className="material-symbols-outlined text-2xl">
                    {icon}
                </span>
            )}
            {(label || value) && !icon && <span>{label || value}</span>}
            {(label || value) && icon && <span>{label || value}</span>}
        </button>
    );
};

export default Button;
