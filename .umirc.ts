import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'reactive-hooks',
  outputPath: 'docs',
  resolve: {
    includes: ['page_docs', 'packages/vhooks/src'],
  },
  base: '/',
  publicPath: '/hooks/',
  history: {
    type: 'hash',
  },
  // more config: https://d.umijs.org/config
});
