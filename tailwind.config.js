import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', ...defaultTheme.fontFamily.sans],
			},
		}
	},

	plugins: [
		// eslint-disable-next-line @typescript-eslint/no-require-imports
		require('daisyui'),
	],

	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#3b82f6',
					secondary: '#93c5fd',
					accent: '#1d4ed8',
					neutral: '#01170F',
					'base-100': '#fafbff',
					info: '#cffafe',
					success: '#d9f99d',
					warning: '#facc15',
					error: '#ef4444',
				},
			},
		],
	},

}
