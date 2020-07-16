import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'vhooks',
  outputPath: 'docs-dist',
  logo: 'https://cn.vuejs.org/images/logo.png',
  resolve: {
    includes: ['docs', 'packages/vhooks/src'],
  },
  // more config: https://d.umijs.org/config
});
