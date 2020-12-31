import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  publicPath: '/static/',
  hash: true,
  ssr: { mode: 'stream' },
  history: {
    type: 'browser',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
});
