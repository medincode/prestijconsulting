import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#1F2B4E",
        navy2: "#233156",
        gold: "#BF9B3F",
        amber: "#EDAB1B",
      },
    },
  },
  plugins: [],
};
export default config;
