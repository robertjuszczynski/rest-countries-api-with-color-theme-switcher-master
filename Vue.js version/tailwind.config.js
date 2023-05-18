/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        //Dark-Blue-Dark-Mode-Elements
        darkBlue: 'hsl(209, 23%, 22%)',
        //Very-Dark-Blue-Dark-Mode-Background
        veryDarkBlueBg: 'hsl(207, 26%, 17%)',
        //Very-Dark-Blue-Light-Mode-Text
        veryDarkBlueTxt: 'hsl(200, 15%, 8%)',
        //Dark-Gray-Light-Mode-Input
        darkGrayInput: 'hsl(0, 0%, 52%)',
        //Very-Light-Gray-Light-Mode-Background
        veryLightGrayBg: 'hsl(0, 0%, 98%)',
        //White-Dark-Mode-Text-&-Light-Mode-Elements
        whiteTextEl: 'hsl(0, 0%, 100%)'
      },
      maxWidth: {
        select: '250px'
      },
      width: {
        512: '512px',
        250: '250px'
      },
      height: {
        60: '60px'
      },
      gridTemplateColumns: {
        'auto-fill': 'repeat(auto-fill, 268px)'
      },
      keyframes: {
        fade: {
          '0%': { opacity: '0%' },
          '100%': { opacity: '100%' }
        }
      },
      animation: {
        fade: 'fade 0.5s ease-in-out'
      }
    }
  },
  plugins: []
}
