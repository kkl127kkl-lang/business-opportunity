import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 디지털 집사 브랜드 컬러
        primary: {
          50: '#FFF8F0',
          100: '#FFE8CC',
          200: '#FFD199',
          300: '#FFB966',
          400: '#FFA233',
          500: '#D4551B',
          600: '#B84515',
          700: '#8C3410',
          800: '#60230B',
          900: '#341206',
        },
      },
      fontFamily: {
        sans: ['Pretendard', 'Apple SD Gothic Neo', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
