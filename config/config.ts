import { defineConfig } from 'umi';
import path from 'path';
import routerData from './router.config';
import { headScripts, metas } from './common.config';

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
  routes: routerData,
  manifest: {
    basePath: '/',
  },
  publicPath: './',
  dynamicImport: {
    loading: '@/layouts/Loading',
  },
  history: {
    type: 'hash',
  },
  alias: {
    '@/': path.resolve(__dirname, '../src/'),
  },
  headScripts,
  metas,
  favicon: '/assets/icon/favico.ico',
  links: [{ rel: 'icon', href: '/assets/icon/favico.ico' }],
  title: 'starry star',
});
