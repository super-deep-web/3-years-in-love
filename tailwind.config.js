/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        peach: '#fb9361',
        sage: '#8fc56f',
        cream: '#f6ebdc',
        apricot: '#fdb17d',
        tan: '#e9b693',
        terracotta: '#dd946d',
        coral: '#e77749',
        sand: '#fda16e',
        ivory: '#f6e1c6',
        ink: '#241c18',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'serif'],
        body: ['var(--font-jakarta)', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-18px) translateX(10px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(14px) translateX(-12px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.04)' },
        },
        ringPulse: {
          '0%': { transform: 'scale(1)', opacity: '0.5' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-6px)' },
          '40%': { transform: 'translateX(6px)' },
          '60%': { transform: 'translateX(-4px)' },
          '80%': { transform: 'translateX(4px)' },
        },
        confetti: {
          '0%': { transform: 'translateY(0) scale(0.5) rotate(0deg)', opacity: '0' },
          '30%': { opacity: '1' },
          '100%': { transform: 'translateY(-46px) scale(0.9) rotate(160deg)', opacity: '0' },
        },
        photoIn: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        photoDrift: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        letterOpen: {
          '0%': { opacity: '0', transform: 'perspective(1000px) rotateX(20deg) translateY(30px) scale(0.9)' },
          '100%': { opacity: '1', transform: 'perspective(1000px) rotateX(0deg) translateY(0) scale(1)' },
        },
        sealCrack: {
          '0%': { opacity: '1', transform: 'scale(1) rotate(0deg)' },
          '45%': { opacity: '1', transform: 'scale(1.2) rotate(-10deg)' },
          '100%': { opacity: '0', transform: 'scale(0.3) rotate(14deg)' },
        },
        contentReveal: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        tapPop: {
          '0%': { transform: 'translateY(0) scale(0.8)', opacity: '1' },
          '100%': { transform: 'translateY(-40px) scale(1.3)', opacity: '0' },
        },
        burst: {
          '0%': { transform: 'translate(-50%, -50%) scale(1)', opacity: '1' },
          '100%': {
            transform: 'translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0.3)',
            opacity: '0',
          },
        },
        petalFall: {
          '0%': { transform: 'translateY(-8%) translateX(0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '25%': { transform: 'translateY(20vh) translateX(20px) rotate(90deg)' },
          '50%': { transform: 'translateY(48vh) translateX(-24px) rotate(180deg)' },
          '75%': { transform: 'translateY(76vh) translateX(18px) rotate(270deg)' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(108vh) translateX(-10px) rotate(360deg)', opacity: '0' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        'float-slow': 'floatSlow 9s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.7s ease-out both',
        'pulse-soft': 'pulseSoft 2.4s ease-in-out infinite',
        'ring-pulse': 'ringPulse 1.8s ease-out infinite',
        shake: 'shake 0.5s ease-in-out both',
        confetti: 'confetti 1.6s ease-out both',
        'photo-in': 'photoIn 0.45s ease-out both',
        'photo-drift': 'photoDrift 8s ease-in-out infinite',
        'letter-open': 'letterOpen 0.55s cubic-bezier(0.16, 1, 0.3, 1) both',
        'seal-crack': 'sealCrack 0.5s ease-in 0.15s both',
        'content-reveal': 'contentReveal 0.4s ease-out 0.35s both',
        'tap-pop': 'tapPop 0.7s ease-out both',
        burst: 'burst 0.6s ease-out both',
        'petal-fall': 'petalFall linear infinite',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(114, 66, 33, 0.12)',
        nav: '0 -8px 30px 0 rgba(114, 66, 33, 0.15)',
      },
    },
  },
  plugins: [],
};
