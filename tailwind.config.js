import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', 'Poppins', ...defaultTheme.fontFamily.sans],
			},
		},
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
					'primary-content': '#dbeafe',
					secondary: '#93c5fd',
					accent: '#1d4ed8',
					neutral: '#01170F',
					'base-100': '#fafbff',
					info: '#38bdf8',
					success: '#a3e635',
					warning: '#eab308',
					error: '#ef4444',
				},
			},
		],
	},
}
