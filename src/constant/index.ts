const Menus = [
  { key: '1', label: '首页', path: '/home' },
  { key: '2', label: '时刻', path: '/awhile' },
  { key: '3', label: '小书', path: '/book' },
];

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
  { type: 1, name: '生活' },
  { type: 2, name: '旅行' },
  { type: 3, name: '娱乐休闲' },
  { type: 4, name: '技术' },
  { type: 5, name: '学习' },
  { type: 6, name: '科技' },
];

export { Menus, tyoeArr, typeDefine };
