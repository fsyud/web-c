export default [
  {
    path: '/',
    component: '../layouts/BasicLayout',
    authority: ['admin'],
    routes: [
      {
        path: '/',
        redirect: '/Article',
      },
    ],
  },
];
