/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        img1:"url('/src/assets/e-commerce.jpg')",
        img2:"url('/src/assets/heroion.jpg')",
        img3:"url('/src/assets/image.jpg')",
      },
    },
  },
  plugins: [],
}

