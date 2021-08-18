import guitar from '@/assets/tags/guitar.svg';
import moto from '@/assets/tags/moto.svg';
import nestjs from '@/assets/tags/nestjs.png';
import node from '@/assets/tags/node.svg';
import react from '@/assets/tags/react.svg';
import typescript from '@/assets/tags/typescript.svg';

const Menus = [
  { key: '1', label: '首页', path: '/home' },
  { key: '2', label: '时刻', path: '/awhile' },
  { key: '3', label: '小书', path: '/book' },
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

export { Menus, tyoeArr, typeDefine, btnConf };
