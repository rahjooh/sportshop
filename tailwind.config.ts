import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0a6847',
                    light: '#4caf50',
                    dark: '#05472a'
                },
                accent: '#f97316'
            },
            fontFamily: {
                display: ['"Yekan Bakh"', 'Poppins', 'sans-serif'],
                body: ['"Yekan Bakh"', 'Inter', 'sans-serif']
            }
        }
    },
    plugins: []
};

export default config;
