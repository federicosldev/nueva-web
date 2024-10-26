/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'primary-purple': '#6976DF',
				'primary-pink': '#EFA6F5',
				'light-purple': '#BBC5F7',
				'dark-purple': '#5A65DC',
			  },
			backgroundImage: {
				'lightpurple-pattern': "url('/public/fondo-lila.svg')",
			  }
		},
	},
	plugins: [
		require('@tailwindcss/typography')
	],
}
