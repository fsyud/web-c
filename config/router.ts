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
        path: '/home',
        name: 'home',
        icon: 'smile',
        component: '@/pages/Home',
      },
      {
        path: '/detail',
        name: 'detail',
        icon: 'smile',
        component: '@/pages/Detail',
      },
      {
        path: '/awhile',
        name: 'awhile',
        icon: 'smile',
        component: '@/pages/Awhile',
      },
      {
        path: '/book',
        name: 'book',
        icon: 'smile',
        component: '@/pages/Book',
      },

      {
        path: '/writeArt',
        name: 'writeArt',
        icon: 'smile',
        component: '@/pages/WriteArt',
      },
      {
        component: './404',
      },
    ],
  },
];
