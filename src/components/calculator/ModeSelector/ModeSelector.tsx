import React from 'react';

/**
 * ModeSelector Props
 */
export interface ModeSelectorProps {
    /** 현재 각도 모드 */
    angleMode: 'DEG' | 'RAD';
    /** 각도 모드 토글 핸들러 */
    onToggleAngleMode: () => void;
    /** 2nd 모드 활성화 여부 */
    secondMode: boolean;
    /** 2nd 모드 토글 핸들러 */
    onToggleSecondMode: () => void;
}

/**
 * 과학 계산기 모드 선택 컴포넌트
 * 
 * @remarks
 * DEG/RAD 각도 모드와 2nd 함수 전환을 제공합니다.
 * 
 * @example
 * ```tsx
 * <ModeSelector 
 *   angleMode="DEG"
 *   onToggleAngleMode={handleToggleAngleMode}
 *   secondMode={false}
 *   onToggleSecondMode={handleToggleSecondMode}
 * />
 * ```
 */
export const ModeSelector: React.FC<ModeSelectorProps> = ({
    angleMode,
    onToggleAngleMode,
    secondMode,
    onToggleSecondMode,
}) => {
    return (
        <div className="
            flex
            gap-2
            mb-4
        ">
            {/* 2nd Mode Toggle */}
            <button
                type="button"
                onClick={onToggleSecondMode}
                className={`
                    flex-1
                    px-4
                    py-2
                    rounded-lg
                    font-semibold
                    text-sm
                    transition-all
                    ${secondMode
                        ? 'bg-purple-500 text-white shadow-md'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }
                    hover:shadow-lg
                    active:scale-95
                `}
                aria-label="Toggle second function mode"
                aria-pressed={secondMode}
            >
                2nd
            </button>

            {/* Angle Mode Toggle */}
            <button
                type="button"
                onClick={onToggleAngleMode}
                className="
                    flex-1
                    px-4
                    py-2
                    rounded-lg
                    font-semibold
                    text-sm
                    transition-all
                    bg-gray-200 dark:bg-gray-700
                    text-gray-700 dark:text-gray-300
                    hover:shadow-lg
                    active:scale-95
                "
                aria-label={`Angle mode: ${angleMode}`}
            >
                {angleMode}
            </button>
        </div>
    );
};

export default ModeSelector;
