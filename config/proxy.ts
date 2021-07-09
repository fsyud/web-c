export default {
  dev: {
    '/api/': {
      target: 'http://localhost:3000/',
      changeOrigin: true,
      pathRewrite: { '^/api/': '' },
    },
  },
  test: {
    '/api/': {
      target: 'https://preview.pro.ant.design',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
