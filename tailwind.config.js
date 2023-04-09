/** @type {import('tailwindcss').Config} */
module.exports = {
  darkmode: 'class',
  content: ["./dist/*.{html,js}"],
  theme: {
    extend: {
       colors: {
        'Dark-Blue-Dark-Mode-Elements': 'hsl(209, 23%, 22%)',
        'Very-Dark-Blue-Dark-Mode-Background': 'hsl(207, 26%, 17%)',
        'Very-Dark-Blue-Light-Mode-Text': 'hsl(200, 15%, 8%)',
        'Dark-Gray-Light-Mode-Input': 'hsl(0, 0%, 52%)',
        'Very-Light-Gray-Light-Mode-Background': 'hsl(0, 0%, 98%)',
        'White-Dark-Mode-Text-&-Light-Mode-Elements': 'hsl(0, 0%, 100%)',
      },
      maxWidth: {
        'select': '250px',
      },
      width: {
        '512': '512px',
        '250': '250px'
      },
      height: {
        '60': '60px',
      },
      gridTemplateColumns: {
        'auto-fill': 'repeat(auto-fill, minmax(320px, 1fr))',
      }
    },
  },
  plugins: [],
}

