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
          const file = path.resolve(root, src);

          return pug.renderFile(file, {
            basedir: root,
            pretty: true,
          });
        });
      },
    },

    handleHotUpdate({ file, server }) {
      if (file.endsWith('.pug')) {
        server.ws.send({
          type: 'full-reload',
        });

        return [];
      }
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
