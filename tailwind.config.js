/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class', // Enable class-based dark mode
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				green: {
					light: '#a8d5ba',
					DEFAULT: '#4caf50',
					dark: '#388e3c'
				},
				white: '#ffffff'
			}
		}
	},
	plugins: []
};
