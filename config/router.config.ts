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
        component: '@/pages/home',
      },
      {
        path: '/detail/:id',
        name: 'detail',
        component: '@/pages/home/detail',
      },
      {
        path: '/tag-column',
        name: 'tag-column',
        component: '@/pages/home/tagcolumn',
      },
      {
        path: '/awhile',
        name: 'awhile',
        component: '@/pages/awhile',
      },
      {
        path: '/book',
        name: 'book',
        component: '@/pages/book',
      },
      {
        path: '/writeArt',
        name: 'writeArt',
        component: '@/pages/writeArt',
      },
      {
        path: '/user',
        name: 'user',
        component: '@/pages/user',
      },
      {
        component: '@/pages/404',
      },
    ],
  },
];
