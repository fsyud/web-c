import marked from 'marked';
import Prism from 'prismjs';
import moment from 'moment';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

export const rendererLink = (href: string, title: string, text: string) => {
  console.log(href, title, text);

  let url = href;
  let target: boolean | string = false;
  if (url.slice(0, 1) !== '#') {
    const urlParams = new URL(href, window.location.origin);
    url = urlParams.href;
    target = urlParams.host !== window.location.host ? '_blank' : false;
  }
  if (!url) {
    return text;
  }
  let out = `<a href="${url}"`;
  if (title) {
    out += ` title="${title}"`;
  }
  if (target !== false) {
    out += ` target="${target}"`;
  }
  out += `>${text}</a>`;

  return out;
};

export const rendererParagraph = (text: string) => {
  // replaceUserMention
  const regExp = /(^| +)@(?!_)(?!.*?_$)(?<username>[a-zA-Z0-9_\u4e00-\u9fa5]{1,10})( +|$)/g;
  return `<p>${text.replace(regExp, '$1<a href="/$2">@$2</a>$3')}</p>`;
};

export const getDefaultMarkedOptions = (): any => {
  const renderer: any = new marked.Renderer();

  renderer.link = rendererLink;
  renderer.paragraph = rendererParagraph;

  marked.use({
    highlight(code: string, lang: string) {
      // if (lang) {
      //   const language = lang.toLowerCase();
      //   const grammar = Prism.languages[language];
      //   if (grammar) {
      //     return Prism.highlight(code, grammar, language);
      //   }
      // }
      return hljs.highlightAuto(code).value;
    },
  });

  const objs = {
    renderer,
    headerIds: false,
    gfm: true,
    breaks: true,
  };

  return objs;
};

export function resetMarkedOptions() {
  marked.setOptions(getDefaultMarkedOptions());
}

// 天数计算
export const DiffDay = (params: any): string => {
  let isDay: string;
  //获取当前时间
  let m1 = moment();
  //获取需要对比的时间
  let m2 = moment(params);
  //计算相差多少天 day可以是second minute
  const day = m2.diff(m1, 'day');

  isDay = day === 0 ? '今天' : Math.abs(day) + '天前';
  return isDay;
};

export const getStringDay = (params: string): string => {
  return `${moment(params).format('YYYY')}年${moment(params).format(
    'MM',
  )}月${moment(params).format('DD')}日`;
};
