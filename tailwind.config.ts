import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-bebas-neue)", "cursive"],
        body:    ["var(--font-space-grotesk)", "sans-serif"],
      },
      colors: {
        bg: '#FFFFFF',
        text: '#111111',
        muted: '#4B5563',
        'muted-2': '#9CA3AF',
        border: '#E5E7EB',
        accent: '#D90429',
        'accent-hover': '#B80322',
      },
    },
  },
  plugins: [],
}

export default config
