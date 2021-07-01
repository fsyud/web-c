export default [
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/',
        redirect: '/home',
      },
      {
        path: 'home',
        name: 'home',
        component: '@/pages/home',
      },
      {
        path: 'home/detail/:id',
        name: 'detail',
        icon: 'smile',
        component: '@/pages/home/detail',
      },
      {
        path: 'awhile',
        name: 'awhile',
        component: '@/pages/awhile',
      },
      {
        path: 'book',
        name: 'book',
        component: '@/pages/book',
      },

      {
        path: 'writeArt',
        name: 'writeArt',
        component: '@/pages/writeArt',
      },
      {
        component: './404',
      },
    ],
  },
];
