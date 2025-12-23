import type { Config } from 'tailwindcss';

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#4B5EFC',
                    hover: '#3D4FE0',
                },
                background: {
                    light: '#F6F6F8',
                    dark: '#17171C',
                },
                surface: {
                    light: '#FFFFFF',
                    dark: '#2E2F38',
                    secondary: '#4E505F',
                },
                text: {
                    'primary-light': '#1F2937',
                    'primary-dark': '#FFFFFF',
                    secondary: '#64748B',
                    tertiary: '#94A3B8',
                },
            },
            fontFamily: {
                display: ['"Space Grotesk"', 'sans-serif'],
                body: ['"Noto Sans"', 'sans-serif'],
            },
            fontSize: {
                display: ['72px', { lineHeight: '1.1', fontWeight: '500' }],
                large: ['48px', { lineHeight: '1.2', fontWeight: '400' }],
            },
            borderRadius: {
                '3xl': '1.5rem',
            },
        },
    },
    plugins: [
        function ({ addUtilities }: any) {
            addUtilities({
                '.calc-btn': {
                    '@apply rounded-2xl font-medium text-2xl transition-all duration-200 active:scale-95':
                        {},
                    '@apply flex items-center justify-center': {},
                },
                '.no-scrollbar': {
                    '-ms-overflow-style': 'none',
                    'scrollbar-width': 'none',
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                },
            });
        },
    ],
} satisfies Config;
