/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				'title': ['Monigue'],
				'paragrahp': ['Cssglykeregular'],
				'banner': ['Menda']
			},
			colors: {
				'primary-purple': '#6976DF',
				'primary-pink': '#EFA6F5',
				'light-purple': '#BBC5F7',
				'dark-purple': '#5A65DC',
				'gradient': '#F5C6CB',
			  },
			backgroundImage: {
				'lightpurple-pattern': "url('/public/fondo-lila.svg')",
				'gradient-bg': 'linear-gradient(180deg, rgba(239,166,245,0.202) 0%, rgba(19,18,23,0.367) 50%)',
			  },
			backgroundColor: {
				'purple-bg': 'rgba(105, 118, 223, 0.21)', // 21% de opacidad
			  }
		},
	},
	plugins: [
		require('@tailwindcss/typography')
	],
}
