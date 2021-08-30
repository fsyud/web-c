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
        title: '首页 - 星空',
      },
      {
        path: '/detail/:id',
        name: 'detail',
        component: '@/pages/home/detail',
        title: '文章详情 - 星空',
      },
      {
        path: '/tag-column',
        name: 'tag-column',
        component: '@/pages/home/tagcolumn',
        title: '标签列表 - 星空',
      },
      {
        path: '/awhile',
        name: 'awhile',
        component: '@/pages/awhile',
        title: '时刻 - 星空',
      },
      {
        path: '/book',
        name: 'book',
        component: '@/pages/book',
        title: '小书 - 星空',
      },
      {
        path: '/writeArt',
        name: 'writeArt',
        component: '@/pages/writeArt',
        title: '文章 - 星空',
      },
      {
        path: '/user',
        name: 'user',
        component: '@/pages/user',
        title: '用户信息 - 星空',
      },
      {
        component: '@/pages/404',
        title: '错误页面！请返回首页',
      },
    ],
  },
];
