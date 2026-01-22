/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './templates/**/*.twig',
    './src/js/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,  // Disable Tailwind's reset - using our hybrid
  },
}
