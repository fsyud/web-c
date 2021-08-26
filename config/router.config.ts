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
        title: 'starry - 星',
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
        title: 'starry - 标签列表',
      },
      {
        path: '/awhile',
        name: 'awhile',
        component: '@/pages/awhile',
        title: 'starry - 时刻',
      },
      {
        path: '/book',
        name: 'book',
        component: '@/pages/book',
        title: 'starry - 小书',
      },
      {
        path: '/writeArt',
        name: 'writeArt',
        component: '@/pages/writeArt',
        title: 'starry - 文章',
      },
      {
        path: '/user',
        name: 'user',
        component: '@/pages/user',
        title: 'starry - 用户信息',
      },
      {
        component: '@/pages/404',
        title: '错误页面！请返回首页',
      },
    ],
  },
];
