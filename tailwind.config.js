// tailwind.config.js
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#6366f1',
          'bg-dark': '#111827',
          'overlay-color': 'rgba(0, 0, 0, 0.6)',
        },
        backdropBlur: {
          xs: '2px',
        },
      },
    },
    plugins: [],
  }