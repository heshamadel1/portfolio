import { defineConfig } from 'vite';
import pug from 'pug';
import path from 'node:path';

function pugPlugin() {
  const root = path.resolve('src');

  return {
    name: 'custom-pug',

    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html.replace(/<pug\s+src=["'](.+?)["']\s*><\/pug>/, (_, src) => {
          return pug.renderFile(path.resolve(root, src), {
            basedir: root,
            pretty: true,
          });
        });
      },
    },
  };
}

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  base: '/portfolio/',

  plugins: [pugPlugin()],

  build: {
    outDir: '../dist',
    emptyOutDir: true,
    cssCodeSplit: false,

    rollupOptions: {
      output: {
        entryFileNames: 'assets/js/index.js',

        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'assets/css/style.css';
          }

          return 'assets/[name][extname]';
        },
      },
    },
  },

  server: {
    port: 3000,
    open: true,
  },
});
