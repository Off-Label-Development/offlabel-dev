import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://offlabel.dev',
  output: 'static',
  adapter: cloudflare(),
  integrations: [sitemap()],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    }
  },
  compressHTML: true,
  prefetch: false,
  trailingSlash: 'never',
  build: {
    inlineStylesheets: 'auto'
  }
});