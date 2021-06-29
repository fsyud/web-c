export default [
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/',
        redirect: '/Home',
      },
      {
        path: '/Home',
        name: 'home',
        icon: 'smile',
        component: '@/pages/Home',
      },
      {
        path: '/Awhile',
        name: 'awhile',
        icon: 'smile',
        component: '@/pages/Awhile',
      },
      {
        path: '/Book',
        name: 'book',
        icon: 'smile',
        component: '@/pages/Book',
      },
      {
        path: '/artDetail',
        name: 'artDetail',
        icon: 'smile',
        component: '@/pages/ArtDetail',
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
