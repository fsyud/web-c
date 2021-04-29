interface tyoeArrType {
  v: number;
  n: string;
}

const Menus = [
  { key: '1', label: '首页', path: 'Home' },
  { key: '2', label: '时刻', path: 'Awhile' },
  { key: '3', label: '小书', path: 'Book' },
];

const tyoeArr: tyoeArrType[] = [
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

export { Menus, tyoeArr };
