/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				'title': ['Monigue'],
				'paragrahp': ['Cssglykeregular'],
				'banner': ['Menda'],
				'textFont': ['Darker Grotesque']
			},
			colors: {
				'primary-purple': '#6976DF',
				'primary-pink': '#EFA6F5',
				'light-purple': '#BBC5F7',
				'dark-purple': '#5A65DC',
				'gradient': '#F5C6CB',
				'dark': '#131217',
				'lightgray':'#242229',
			},
			backgroundImage: {
				'lightpurple-pattern': "url('/fondo-lila.svg')",
				'gradient-bg': 'linear-gradient(180deg, rgba(239,166,245,0.202) 0%, rgba(19,18,23,0.367) 50%)',
			},
			backgroundColor: {
				'purple-bg': 'rgba(105, 118, 223, 0.21)', // 21% de opacidad
			},
			typography: {
				invert: {
					css: {
						a: {
							color: '#6976DF',
							textDecoration: 'underline',
							'&:hover': {
								color: '#5A65DC',
								textDecoration: 'underline',
							},
						},
						strong: {
							color: '#5A65DC',
							fontWeight: 'bold',
						},
					},
				},
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography')
	],
};
