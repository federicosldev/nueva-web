import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/static';  // or 'serverless' if you need SSR

export default defineConfig({
  integrations: [tailwind()],
  output: 'static',          // or 'server' if you need SSR
  adapter: vercel(),
  vite: {
    ssr: {
      noExternal: ['matter-js'],
    },
  },
});