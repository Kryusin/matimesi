import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      letterSpacing: {
        'default': '7.68px',
        'small': '6px'
      },
      animation: {
        'fadeIn': 'fade-in 1s',
        'fadeOut': 'fade-out 1s'
      },
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: '0'
          },
          '70%': {
            opacity: '0',
            transform: 'translateX(100px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
