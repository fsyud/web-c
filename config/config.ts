import { defineConfig } from 'umi';
import path from 'path';
import routerData from './router.config';
import proxy from './proxy';
import { headScripts, metas } from './common.config';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
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
  ignoreMomentLocale: true,
  routes: routerData,
  manifest: {
    basePath: '/',
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  proxy: proxy[REACT_APP_ENV || 'dev'],
  extraBabelPlugins: [
    [
      'prismjs',
      {
        languages: [
          'markup',
          'markup-templating',
          'cpp',
          'css',
          'less',
          'scss',
          'clike',
          'javascript',
          'typescript',
          'jsx',
          'tsx',
          'php',
          'java',
          'bash',
          'ini',
          'json',
          'sql',
          'yaml',
        ],
        plugins: ['line-numbers', 'show-language', 'copy-to-clipboard'],
        theme: 'okaidia',
        css: true,
      },
    ],
  ],
  alias: {
    '@/': path.resolve(__dirname, '../src/'),
  },
  headScripts,
  metas,
  favicon: './pencil.ico',
  title: 'StarryStar - 代码里不仅有bug 还有时光',
});
