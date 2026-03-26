/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
<<<<<<< HEAD
      colors: {
        "secondary-fixed-dim": "#b4c5ff",
        "primary": "#004ac6",
=======
      animation: {
        fadeIn: 'fadeIn 0.6s ease-in',
        slideInLeft: 'slideInLeft 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        slideInRight: 'slideInRight 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        slideInUp: 'slideInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        featureSlideIn: 'featureSlideIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        benefitSlideUp: 'benefitSlideUp 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        ctaSlideIn: 'ctaSlideIn 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'rotate-slow': 'rotate 8s linear infinite',
        shimmer: 'shimmer 3s ease-in-out infinite',
        'bounce-slight': 'bounce-slight 2s ease-in-out infinite',
        headingGlow: 'headingGlow 3s ease-in-out infinite',
        'rotate-360': 'rotate-360 0.6s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        featureSlideIn: {
          '0%': { opacity: '0', transform: 'translateY(20px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        benefitSlideUp: {
          '0%': { opacity: '0', transform: 'translateY(25px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        ctaSlideIn: {
          '0%': { opacity: '0', transform: 'translateY(80px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)', opacity: '0.4' },
          '25%': { transform: 'translateY(-30px) translateX(10px)', opacity: '0.5' },
          '50%': { transform: 'translateY(-60px) translateX(-10px)', opacity: '0.4' },
          '75%': { transform: 'translateY(-30px) translateX(15px)', opacity: '0.5' },
        },
        shimmer: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        headingGlow: {
          '0%, 100%': { textShadow: '0 0 20px rgba(0, 74, 198, 0)' },
          '50%': { textShadow: '0 0 20px rgba(0, 74, 198, 0.2)' },
        },
        'rotate-360': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'bounce-slight': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      colors: {
        "secondary-fixed-dim": "#b4c5ff",
        "primary": "#004ac6",
        "primary-light": "#0055e0",
>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23
        "inverse-surface": "#2d3133",
        "on-tertiary": "#ffffff",
        "on-secondary-fixed": "#00174b",
        "on-error": "#ffffff",
<<<<<<< HEAD
        "on-primary-fixed-variant": "#003ea8",
        "outline-variant": "#c3c6d7",
        "on-surface": "#191c1e",
        "surface-tint": "#0053db",
        "on-primary-container": "#eeefff",
=======
        "on-primary-fixed-variant": "#6d28d9",
        "outline-variant": "#c3c6d7",
        "on-surface": "#191c1e",
        "surface-tint": "#8b5cf6",
        "on-primary-container": "#f3e8ff",
>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23
        "surface-container-lowest": "#ffffff",
        "surface-container-high": "#e6e8eb",
        "on-primary": "#ffffff",
        "on-secondary-fixed-variant": "#31447b",
        "secondary": "#495c95",
        "error-container": "#ffdad6",
        "surface-container": "#eceef1",
        "on-tertiary-fixed-variant": "#7d2d00",
        "surface-dim": "#d8dadd",
        "tertiary": "#943700",
        "surface": "#f7f9fc",
        "surface-container-low": "#f2f4f7",
<<<<<<< HEAD
        "inverse-primary": "#b4c5ff",
        "primary-container": "#2563eb",
        "primary-fixed": "#dbe1ff",
        "on-primary-fixed": "#00174b",
=======
        "inverse-primary": "#c4b5fd",
        "primary-container": "#8b5cf6",
        "primary-fixed": "#ede9fe",
        "on-primary-fixed": "#3f0f66",
>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23
        "on-surface-variant": "#434655",
        "on-secondary": "#ffffff",
        "inverse-on-surface": "#eff1f4",
        "tertiary-container": "#bc4800",
        "error": "#ba1a1a",
        "surface-bright": "#f7f9fc",
        "on-tertiary-container": "#ffede6",
        "on-tertiary-fixed": "#360f00",
        "background": "#f7f9fc",
        "tertiary-fixed": "#ffdbcd",
        "secondary-container": "#acbfff",
        "on-error-container": "#93000a",
<<<<<<< HEAD
        "primary-fixed-dim": "#b4c5ff",
=======
        "primary-fixed-dim": "#ddd6fe",
>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23
        "tertiary-fixed-dim": "#ffb596",
        "surface-variant": "#e0e3e6",
        "outline": "#737686",
        "surface-container-highest": "#e0e3e6",
        "on-background": "#191c1e",
        "on-secondary-container": "#394c84",
        "secondary-fixed": "#dbe1ff"
      },
      fontFamily: {
        "headline": ["Poppins", "sans-serif"],
        "body": ["Roboto", "sans-serif"],
        "label": ["Inter", "sans-serif"],
        "poppins": ["Poppins", "sans-serif"],
        "roboto": ["Roboto", "sans-serif"],
        "inter": ["Inter", "sans-serif"],
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
}
