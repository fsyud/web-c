// 配置 <head> 里的额外脚本，数组项为字符串或对象。
export const headScripts = [
  {
    async: true,
    src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
    'data-ad-client': 'ca-pub-3900191310640369',
  },
];

// 配置额外的 meta 标签。数组中可以配置key:value形式的对象。
export const metas = [
  {
    name: 'keywords',
    content: 'umi, umijs',
  },
  {
    name: 'description',
    content: '博客，记录日常开发笔记',
  },
  {
    name: 'author',
    content: 'naze',
  },
  {
    name: 'keywords',
    content: '日常记录、创作、学习、生活、娱乐、旅行、随笔',
  },
  {
    name: 'og:title',
    content: '日常记录、创作、学习、生活、娱乐、旅行、随笔',
  },
];
