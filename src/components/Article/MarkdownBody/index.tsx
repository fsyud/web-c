import React, { useEffect, useRef } from 'react';
import marked from 'marked';
import DOMPurify from 'dompurify';
import Prism from 'prismjs';
import { resetMarkedOptions, getDefaultMarkedOptions } from '@/utils/utils';
// @ts-ignore
import emojiToolkit from 'emoji-toolkit';
import Tocify from './tocify';

import './index.less';

export interface MarkdownBodyProps {
  markdown: string;
  prismPlugin?: boolean;
  toc?: boolean;
  getTocify?: (tocify: Tocify) => void;
}

const tocify = new Tocify();

const MarkdownBody: React.FC<MarkdownBodyProps> = (props) => {
  const markdownRef = useRef<HTMLDivElement | null>(null);

  const runPlugin = async () => {
    // https://webpack.docschina.org/guides/code-splitting/#%E5%8A%A8%E6%80%81%E5%AF%BC%E5%85%A5-dynamic-imports-
    const [
      { default: jQuery },
      { debounce, throttle },
    ]: any = await Promise.all([
      import(/* webpackChunkName: 'jquery' */ 'jquery'),
      // @ts-ignore
      import(/* webpackChunkName: 'throttle-debounce' */ 'throttle-debounce'),
    ]);

    jQuery.debounce = debounce;
    jQuery.throttle = throttle;
    // @ts-ignore
    window.jQuery = jQuery;

    await Promise.all([
      // @ts-ignore
      import(/* webpackChunkName: 'fluidbox' */ 'fluidbox'),
      import(
        /* webpackChunkName: 'fluidbox' */ 'fluidbox/dist/css/fluidbox.min.css'
      ),
    ]);

    jQuery(markdownRef.current)
      .find('img:not(.joypixels)')
      .each(function () {
        // @ts-ignore
        jQuery(this).wrap(
          // @ts-ignore
          `<a href="${jQuery(this).attr('src')}" class="fluidbox" />`,
        );
      })
      .promise()
      .done(() => jQuery(markdownRef.current).find('a.fluidbox').fluidbox());

    if (props.prismPlugin) {
      jQuery(markdownRef.current).find('pre').addClass('line-numbers');
      Prism.highlightAllUnder(markdownRef.current as any);
    }
  };

  useEffect(() => {
    resetMarkedOptions();

    if (props.toc && props.getTocify) {
      props.getTocify(tocify);
    }

    runPlugin();
  }, []);

  const createMarkup = () => {
    if (props.toc) {
      marked.setOptions({
        renderer: new marked.Renderer(),
        highlight: function (code) {
          console.log(code);
        },
        gfm: true, // 允许 Git Hub标准的markdown.
        pedantic: false, // 不纠正原始模型任何的不良行为和错误（默认为false）
        sanitize: false, // 对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
        breaks: false, // 允许回车换行（该选项要求 gfm 为true）
        smartLists: true, // 使用比原生markdown更时髦的列表
        smartypants: false, // 使用更为时髦的标点
      });

      // // tocify.reset();
      // const { renderer, ...otherOptions } = getDefaultMarkedOptions();
      // console.log(otherOptions, 'otherOptions')

      // renderer.heading = (text: any, level: any) => {
      //   console.log(text, level);
      //   const anchor = tocify.add('text', 1);
      //   return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
      // };
      // marked.setOptions({ renderer, ...otherOptions });
    }

    const markup = DOMPurify.sanitize(
      emojiToolkit.toImage(marked(props.markdown)),
    );

    resetMarkedOptions();
    return { __html: markup };
  };

  return (
    <div
      ref={markdownRef}
      className="markdown-body"
      dangerouslySetInnerHTML={createMarkup()}
    />
  );
};

export default MarkdownBody;
