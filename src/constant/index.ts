import guitar from '@/assets/tags/guitar.svg';
import moto from '@/assets/tags/moto.svg';
import nestjs from '@/assets/tags/nestjs.png';
import node from '@/assets/tags/node.svg';
import react from '@/assets/tags/react.svg';
import typescript from '@/assets/tags/typescript.svg';
import waiting from '@/assets/awhile/waiting.svg';
import get from '@/assets/awhile/get.svg';
import minecraft from '@/assets/awhile/minecraft.png';

const Menus = [
  { key: '1', label: '首页', path: '/home' },
  { key: '2', label: '沸点', path: '/awhile' },
  { key: '3', label: '项目', path: '/project' },
  { key: '4', label: '关于', path: '/about' },
];

const menuTitle: GLOBAL.titleMrnuProps[] = [
  { title: 'starry - 代码里的时光', router: '/home' },
  { title: '时刻 - starry', router: '/awhile' },
  { title: '未找到 - starry！', router: '/404' },
  { title: '标签列表 - starry', router: '/tag-column' },
  { title: '写文章 - starry', router: '/writeArt' },
  { title: '编辑文章 - starry', router: '/writeArt?id' },
  { title: '用户信息设置 - starry', router: '/user' },
];

// 类型
const tyoeArr: GLOBAL.tyoeArrType[] = [
  { v: 1, n: '全部' },
  { v: 2, n: 'java' },
  { v: 3, n: '前端' },
  { v: 4, n: '后端' },
  { v: 5, n: '工具' },
  { v: 6, n: 'mac' },
  { v: 7, n: '算法' },
  { v: 8, n: 'git' },
  { v: 9, n: 'mysql' },
  { v: 10, n: 'react' },
];

// tag-column
const typeDefine: GLOBAL.tagType[] = [
  {
    type: 1,
    name: '生活',
    children: [
      {
        type: 101,
        name: '机车',
        parents: 1,
        icon: moto,
      },
    ],
  },
  { type: 2, name: '旅行' },
  {
    type: 3,
    name: '娱乐休闲',
    children: [
      {
        type: 301,
        name: '吉他',
        parents: 3,
        icon: guitar,
      },
    ],
  },
  {
    type: 4,
    name: '技术',
    children: [
      {
        type: 401,
        name: 'React',
        parents: 4,
        icon: react,
      },
      {
        type: 402,
        name: 'Nodejs',
        parents: 4,
        icon: node,
      },
      {
        type: 403,
        name: 'TypeScript',
        parents: 4,
        icon: typescript,
      },
      {
        type: 404,
        name: 'Nestjs',
        parents: 4,
        icon: nestjs,
      },
    ],
  },
  { type: 5, name: '学习' },
  { type: 6, name: '科技' },
];

// 筛选类型
const btnConf: GLOBAL.tagType[] = [
  { type: 3, name: '热榜' },
  { type: 2, name: '热门' },
  { type: 1, name: '最新' },
];

const topicConfList: GLOBAL.tagType[] = [
  { type: 999, name: '推荐' },
  { type: 1, name: '上班摸鱼', icon: waiting },
  { type: 2, name: '今天学到了', icon: get },
  { type: 3, name: '每日算法题', icon: minecraft },
  { type: 4, name: '开发工具推荐', icon: minecraft },
  { type: 5, name: '优秀开源推荐', icon: minecraft },
  { type: 6, name: '今日最佳', icon: minecraft },
  { type: 7, name: '读书笔记', icon: minecraft },
  { type: 8, name: '提问回答', icon: minecraft },
  { type: 9, name: '好文推荐', icon: minecraft },
  { type: 10, name: '代码秀', icon: minecraft },
  { type: 11, name: '人在职场', icon: minecraft },
  { type: 12, name: '划个知识点', icon: minecraft },
  { type: 13, name: '下班打卡', icon: minecraft },
  { type: 14, name: '什么值得买', icon: minecraft },
  { type: 15, name: '来啊，斗图吧', icon: minecraft },
  { type: 16, name: '游戏玩家俱乐部', icon: minecraft },
  { type: 17, name: '值得收藏的歌单', icon: minecraft },
  { type: 18, name: '求职中', icon: minecraft },
  { type: 19, name: '进击的 React', icon: minecraft },
  { type: 20, name: '定个小目标', icon: minecraft },
];

export { Menus, menuTitle, tyoeArr, typeDefine, btnConf, topicConfList };
