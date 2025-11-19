module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui"],
      },
      colors: {
        primary: "#6366F1",
        secondary: "#06B6D4",
        darkBg: "#020617",
        card: "rgba(15,23,42,0.7)",
      },
      boxShadow: {
        soft: "0 18px 45px rgba(15,23,42,0.6)",
      },
    },
  },
  plugins: [],
};
