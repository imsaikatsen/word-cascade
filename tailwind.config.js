module.exports = {
  theme: {
    extend: {
      animation: {
        fall: 'falling linear infinite',
      },
      keyframes: {
        falling: {
          '0%': { transform: 'translateY(-10%)', opacity: 1 },
          '100%': { transform: 'translateY(100vh)', opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};
