export default [
  {
    path: '/',
    component: '@/pages/index',
    routes: [
      {
        path: '/',
        component: '@/pages/index',
        routes: [
          {
            path: 'Article',
            component: 'Article',
          },
          {
            path: 'Regard',
            component: 'Regard',
          },
        ],
      },
    ],
  },
];
