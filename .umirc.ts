import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'proxy-hooks',
  outputPath: 'docs',
  mode: 'site',
  resolve: {
    includes: ['page_docs', 'packages/vhooks/src'],
  },
  base: '/',
  publicPath: '/hooks/',
  history: {
    type: 'hash',
  },
  navs: [
    { title: 'hooks', path: '/hooks' },
    {
      title: 'GitHub',
      path: 'https://github.com/wen-haoming/proxy-hooks',
    },
    {
      title: '更新日志',
      path: 'https://github.com/wen-haoming/proxy-hooks/commits/master',
    },
  ],
  // more config: https://d.umijs.org/config
});
