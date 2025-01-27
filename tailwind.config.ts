import type { Config } from 'tailwindcss';
import { withUt } from 'uploadthing/tw';

export default withUt({
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#615EFC',
        grayDarkest: '#131316',
        grayDarker: '#212126',
        grayDark: '#9394A1',
        secondary: '#2979ff'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}) satisfies Config;
