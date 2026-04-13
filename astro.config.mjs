import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://romain-dal-farra.com',
  output: 'static',
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  vite: {
    css: {
      devSourcemap: true,
    },
  },
});
