import React, { useEffect, useRef } from 'react';
import marked from 'marked';
import DOMPurify from 'dompurify';
import { resetMarkedOptions } from '@/utils/utils';
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

  useEffect(() => {
    resetMarkedOptions();
  }, []);

  const createMarkup = () => {
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
