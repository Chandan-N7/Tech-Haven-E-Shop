/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xsm': '300px',  // Small devices (e.g., phones)
        'xxsm': '480px',  // Small devices (e.g., phones)
        '1xsm': '590px',  // Small devices (e.g., phones)
        'sm': '640px',  // Small devices (e.g., phones)
        'md': '880px',  // Medium devices (e.g., tablets)
        'lg': '1024px', // Large devices (e.g., laptops)
        'xl': '1200px', // Extra large devices (e.g., desktops)
        '2xl': '1400px' // 2XL devices (e.g., larger desktops)
      },
    },
  },
  plugins: [],
}