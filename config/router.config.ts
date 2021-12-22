export default [
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/',
        name: 'index',
        component: '@/pages',
        title: '星空 - 光明如同日月星辰 代码不止',
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
        title: '留言 - 星空',
      },
      {
        path: '/about',
        name: 'about',
        component: '@/pages/about',
        title: '关于 - 星空',
      },
      {
        path: '/project',
        name: 'project',
        component: '@/pages/project',
        title: '项目 - 星空',
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
        path: '/404',
        name: '404',
        component: '@/pages/404',
        title: '错误页面！请返回首页',
      },
      {
        path: '/protocol',
        name: 'protocol',
        component: '@/pages/protocol',
        title: '用户协议 - 星空',
      },
      {
        path: '/privacy',
        name: 'privacy',
        component: '@/pages/protocol/privacy',
        title: '隐私政策 - 星空',
      },
    ],
  },
];
