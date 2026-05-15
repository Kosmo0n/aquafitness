import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ["Cinzel", "serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        navy: {
          950: "#000814",
          900: "#001529",
          800: "#001D3D",
          700: "#003566",
          600: "#005f99",
        },
        azure: {
          400: "#00b4d8",
          300: "#48cae4",
          200: "#90e0ef",
          100: "#caf0f8",
        },
      },
      animation: {
        "gradient-shift": "gradientShift 12s ease infinite",
        "caustic-pulse": "causticPulse 8s ease-in-out infinite",
        "float-up": "floatUp 6s ease-in-out infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "fade-in-up": "fadeInUp 0.8s ease forwards",
      },
      keyframes: {
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        causticPulse: {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.05)" },
        },
        floatUp: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glowPulse: {
          "0%, 100%": {
            textShadow:
              "0 0 20px rgba(0,180,216,0.5), 0 0 40px rgba(0,180,216,0.3)",
          },
          "50%": {
            textShadow:
              "0 0 40px rgba(0,180,216,0.9), 0 0 80px rgba(0,180,216,0.5), 0 0 120px rgba(0,53,102,0.4)",
          },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backdropBlur: {
        xs: "4px",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 180, 216, 0.1)",
        "glass-hover": "0 8px 40px rgba(0, 180, 216, 0.25)",
        glow: "0 0 30px rgba(0, 180, 216, 0.3)",
        "glow-lg": "0 0 60px rgba(0, 180, 216, 0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
