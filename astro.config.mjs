import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://maxriggi.github.io',
  base: '/romain-dal-farra.com',
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
