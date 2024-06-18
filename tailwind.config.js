import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	plugins: [
		// eslint-disable-next-line @typescript-eslint/no-require-imports
		require('daisyui'),
	],

	daisyui: {
		themes: ['bumblebee'],
	},

	themes: {
		fontFamily: {
			sans: ['Inter', ...defaultTheme.fontFamily.sans],
		},
	},
}
