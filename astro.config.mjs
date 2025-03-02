import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/static';  // or 'serverless' if you need SSR
import react from '@astrojs/react';

export default defineConfig({
  integrations: [
    tailwind(),
    
  ],
  output: 'static',          // or 'server' if you need SSR
  adapter: vercel(),
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
    remotePatterns: [{ protocol: 'https' }],
    domains: [],
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
