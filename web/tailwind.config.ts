import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        weaponx: {
          primary: "#e31c25",
          secondary: "#ffd700",
          bg: "#0a0a0a",
          card: "#1a0a0a",
        }
      }
    },
  },
  plugins: [],
};
export default config;
