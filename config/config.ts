import { defineConfig } from 'umi';
import path from 'path';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  hash: true,
  // 浏览器兼容版本
  targets: {
    android: 5,
    ios: 7,
    chrome: 58,
    ie: 9,
  },
  publicPath: '/static/',
  history: {
    type: 'hash',
  },
  alias: {
    '@/': path.resolve(__dirname, '../src/'),
  },
  routes: [{ path: '/', component: '@/pages/index' }],
});
