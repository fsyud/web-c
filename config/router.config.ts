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
        component: './home',
      },
      {
        path: '/detail/:id',
        name: 'detail',
        icon: 'smile',
        component: './home/detail',
      },
      {
        path: '/awhile',
        name: 'awhile',
        component: './awhile',
      },
      {
        path: '/book',
        name: 'book',
        component: './book',
      },

      {
        path: '/writeArt',
        name: 'writeArt',
        component: './writeArt',
      },
      {
        component: './404',
      },
    ],
  },
];
