/*
 *                        ::
 *                       :;J7, :,                        ::;7:
 *                       ,ivYi, ,                       ;LLLFS:
 *                       :iv7Yi                       :7ri;j5PL
 *                      ,:ivYLvr                    ,ivrrirrY2X,
 *                      :;r@Wwz.7r:                :ivu@kexianli.
 *                     :iL7::,:::iiirii:ii;::::,,irvF7rvvLujL7ur
 *                    ri::,:,::i:iiiiiii:i:irrv177JX7rYXqZEkvv17
 *                 ;i:, , ::::iirrririi:i:::iiir2XXvii;L8OGJr71i
 *               :,, ,,:   ,::ir@mingyi.irii:i:::j1jri7ZBOS7ivv,
 *                  ,::,    ::rv77iiiriii:iii:i::,rvLq@huhao.Li
 *              ,,      ,, ,:ir7ir::,:::i;ir:::i:i::rSGGYri712:
 *            :::  ,v7r:: ::rrv77:, ,, ,:i7rrii:::::, ir7ri7Lri
 *           ,     2OBBOi,iiir;r::        ,irriiii::,, ,iv7Luur:
 *         ,,     i78MBBi,:,:::,:,  :7FSL: ,iriii:::i::,,:rLqXv::
 *         :      iuMMP: :,:::,:ii;2GY7OBB0viiii:i:iii:i:::iJqL;::
 *        ,     ::::i   ,,,,, ::LuBBu BBBBBErii:i:i:i:i:i:i:r77ii
 *       ,       :       , ,,:::rruBZ1MBBqi, :,,,:::,::::::iiriri:
 *      ,               ,,,,::::i:  @arqiao.       ,:,, ,:::ii;i7:
 *     :,       rjujLYLi   ,,:::::,:::::::::,,   ,:i,:,,,,,::i:iii
 *     ::      BBBBBBBBB0,    ,,::: , ,:::::: ,      ,,,, ,,:::::::
 *     i,  ,  ,8BMMBBBBBBi     ,,:,,     ,,, , ,   , , , :,::ii::i::
 *     :      iZMOMOMBBM2::::::::::,,,,     ,,,,,,:,,,::::i:irr:i:::,
 *     i   ,,:;u0MBMOG1L:::i::::::  ,,,::,   ,,, ::::::i:i:iirii:i:i:
 *     :    ,iuUuuXUkFu7i:iii:i:::, :,:,: ::::::::i:i:::::iirr7iiri::
 *     :     :rk@Yizero.i:::::, ,:ii:::::::i:::::i::,::::iirrriiiri::,
 *      :      5BMBBBBBBSr:,::rv2kuii:::iii::,:i:,, , ,,:,:i@petermu.,
 *           , :r50EZ8MBBBBGOBBBZP7::::i::,:::::,: :,:,::i;rrririiii::
 *               :jujYY7LS0ujJL7r::,::i::,::::::::::::::iirirrrrrrr:ii:
 *            ,:  :@kevensun.:,:,,,::::i:i:::::,,::::::iir;ii;7v77;ii;i,
 *            ,,,     ,,:,::::::i:iiiii:i::::,, ::::iiiir@xingjief.r;7:i,
 *         , , ,,,:,,::::::::iiiiiiiiii:,:,:::::::::iiir;ri7vL77rrirri::
 *          :,, , ::::::::i:::i:::i:i::,,,,,:,::i:i:::iir;@Secbone.ii:::
 */
import marked from 'marked';
import Prism from 'prismjs';
import moment from 'moment';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

export const rendererLink = (href: string, title: string, text: string) => {
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

/**
 * @description: prism marked渲染返回配置项
 * @param {*} any
 * @return {*}
 */
export const getDefaultMarkedOptions = (): any => {
  const renderer: any = new marked.Renderer();

  renderer.link = rendererLink;
  renderer.paragraph = rendererParagraph;

  marked.use({
    highlight(code: string, lang: string) {
      if (lang) {
        const language = lang.toLowerCase();
        const grammar = Prism.languages[language];
        if (grammar) {
          return Prism.highlight(code, grammar, language);
        }
      }
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

/**
 * @description: 字符串插入
 * @param {HTMLTextAreaElement} texteara 输入框实例
 * @param {string} str 插入字符串
 * @return {*}
 */
export function insertText(texteara: HTMLTextAreaElement, str: string): string {
  // @ts-ignore
  if (document.selection) {
    // @ts-ignore
    const sel = document.selection.createRange();
    sel.text = str;
  } else if (
    typeof texteara.selectionStart === 'number' &&
    typeof texteara.selectionEnd === 'number'
  ) {
    const startPos = texteara.selectionStart;
    const endPos = texteara.selectionEnd;
    let cursorPos = startPos;
    const tmpStr = texteara.value;
    texteara.value =
      tmpStr.substring(0, startPos) +
      str +
      tmpStr.substring(endPos, tmpStr.length);
    cursorPos += str.length;
    texteara.selectionStart = texteara.selectionEnd = cursorPos;
  } else {
    texteara.value += str;
  }

  return texteara.value;
}

/**
 * @description: 根据时间戳计算天数
 * @param {any} params
 * @return {*}
 */
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

/**
 * @description:
 * @param {string} url 跳转地址
 * @param {string} id 怨毒唯一标识
 * @return {*}
 */
export const createSuperLabel = (url: string, id: string) => {
  let a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('target', '_blank');
  a.setAttribute('id', id);
  // 防止反复添加
  if (!document.getElementById(id)) {
    document.body.appendChild(a);
  }
  a.click();
};

/**
 * @description: 需要截取的字符串
 * @param {string} url
 * @return {*}
 */
export const GithubStringSlice = (url: string): string => {
  return url.split('/').pop() || '';
};
