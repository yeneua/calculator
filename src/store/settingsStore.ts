import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * 테마 타입
 */
export type Theme = 'light' | 'dark';

/**
 * 설정 상태 인터페이스
 */
interface SettingsState {
    theme: Theme;
    decimalPlaces: number;
    thousandsSeparator: boolean;
}

/**
 * 설정 액션 인터페이스
 */
interface SettingsActions {
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
    setDecimalPlaces: (places: number) => void;
    toggleThousandsSeparator: () => void;
}

// 초기 상태
const initialState: SettingsState = {
    theme: 'light',
    decimalPlaces: 10,
    thousandsSeparator: true,
};

/**
 * 설정 스토어
 * 
 * @remarks
 * 애플리케이션 설정(테마, 숫자 표시 형식 등)을 관리합니다.
 * 설정은 localStorage에 자동으로 저장됩니다.
 * 
 * 관련 FR: FR-23 (다크 모드), FR-24 (설정)
 */
export const useSettingsStore = create<SettingsState & SettingsActions>()(
    persist(
        (set, get) => ({
            ...initialState,

            /**
             * 테마 설정
             * 
             * @param theme - 설정할 테마 ('light' | 'dark')
             */
            setTheme: (theme: Theme) => {
                set({ theme });
                // DOM에 클래스 적용
                if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            },

            /**
             * 테마 토글 (light ↔ dark)
             */
            toggleTheme: () => {
                const currentTheme = get().theme;
                const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';
                get().setTheme(newTheme);
            },

            /**
             * 소수점 자릿수 설정
             * 
             * @param places - 소수점 자릿수 (0-15)
             */
            setDecimalPlaces: (places: number) => {
                // 유효성 검증
                const validPlaces = Math.max(0, Math.min(15, places));
                set({ decimalPlaces: validPlaces });
            },

            /**
             * 천 단위 구분자 토글
             */
            toggleThousandsSeparator: () => {
                const current = get().thousandsSeparator;
                set({ thousandsSeparator: !current });
            },
        }),
        {
            name: 'settings-storage',
            // 스토어 복원 후 테마 적용
            onRehydrateStorage: () => (state) => {
                if (state && state.theme === 'dark') {
                    document.documentElement.classList.add('dark');
                }
            },
        }
    )
);
