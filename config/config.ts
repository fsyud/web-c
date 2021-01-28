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
    ie: 11,
  },
  dva: {
    hmr: true,
  },
  routes: routerData,
  manifest: {
    basePath: '/',
  },
  publicPath: './',
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  alias: {
    '@/': path.resolve(__dirname, '../src/'),
  },
  headScripts,
  metas,
  favicon: './favico.ico',
  title: 'starry star',
});
