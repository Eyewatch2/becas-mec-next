import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          500: '#2EBB38',
          800: '#083E0C',
        }
      },
      fontFamily: {
        'monrope': ['Monrope', 'sans-serif'],
      },
      fontSize: {
        'xxs': '0.7rem',
      },
    },
  },
  plugins: [],
};
export default config;
