/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        danger: '#f44250',
        success: '#6bd968',
        warning: '#fecc1b',
        process: '#3992ff',
        // button action
        // light mode
        'light-text-primary': '#09090B',
        'light-text-secondary': '#71717A',
        'light-bg-primary': '#FFFFFF',
        'light-bg-secondary': '#f4f4f5',
        'light-border': '#e4e4e7',
        'light-action': '#18181B',
        'light-action-hover': '#18181be6',
        // dark mode
        'dark-text-primary': '#FAFAFA',
        'dark-text-secondary': '#A1A1AA',
        'dark-bg-primary': '#09090b',
        'dark-bg-secondary': '#151518',
        'dark-border': '#b8c0cc33',
        'dark-action': '#FAFAFA',
        'dark-action-hover': '#fafafae6',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}