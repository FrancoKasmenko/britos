// tailwind.config.ts
import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        heading: ["var(--font-sora)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
