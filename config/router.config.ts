export default [
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/',
        redirect: '/Article',
      },
      {
        path: '/Article',
        name: 'article',
        icon: 'smile',
        component: '@/pages/Article',
      },
      {
        path: '/Regard',
        name: 'regard',
        icon: 'smile',
        component: '@/pages/Regard',
      },
      {
        path: '/About',
        name: 'about',
        icon: 'smile',
        component: '@/pages/About',
      },
      {
        component: './404',
      },
    ],
  },
];
