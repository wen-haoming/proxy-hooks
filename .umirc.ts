import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'vhooks',
  outputPath: 'docs',
  logo: 'https://cn.vuejs.org/images/logo.png',
  resolve: {
    includes: ['page_docs', 'packages/vhooks/src'],
  },
  base: '/vhooks',
  publicPath: '/v-reactive-hooks',
  // more config: https://d.umijs.org/config
});
