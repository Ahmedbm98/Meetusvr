/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      screens: {
        sm: "600px",
        md: "728px",
        lg: "1000px",
        xl: "1200px",
      },
    },
    extend: {
      colors: {
        maincolor: "#9414FF",
        secondColor: "#1A1A1E",
        colortext: "#62626B",
      },
    },
  },
  plugins: [],
};
