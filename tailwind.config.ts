import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { acid: '#2059F6', ink: '#07100e', ocean: '#081817' },
      boxShadow: { glow: '0 0 0 1px rgba(32,89,246,.12), 0 18px 50px rgba(0,0,0,.22)' },
      fontFamily: { sans: ['Inter', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'] },
    },
  },
  plugins: [],
} satisfies Config
