import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/static';


export default defineConfig({
  integrations: [
    tailwind(),
  ],
  output: 'static',
  adapter: vercel(),
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  vite: {
    ssr: {
      noExternal: ['matter-js'],
    },
    optimizeDeps: {
      include: ['matter-js'],
    },
  },
});
