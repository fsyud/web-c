import React, { useState, useEffect, useRef } from 'react';
import { Input, Button } from 'antd';
import classnames from 'classnames';
import smile1 from '@/assets/svg/smile1.svg';
import photo from '@/assets/svg/photo.svg';
import SkyEmoji from '@/components/SKy/SkyEmoji';

import styles from './Comment.less';

const { TextArea } = Input;

interface CommentProps {
  commitSta: boolean;
  placeholder?: string;
  style?: React.CSSProperties;
  sumbitForm: (value: string) => void;
  isClear?: boolean;
}

const Comment: React.FC<CommentProps> = (props) => {
  const { commitSta, placeholder, sumbitForm, isClear } = props;
  const [emojivis, setEmojivis] = useState<boolean>(false);
  const [chatContent, setChatContent] = useState<any>('');
  const [focusSta, setFocusSta] = useState<boolean>(true);
  const [areaLocal, setareaLocal] = useState<number>(0);

  useEffect(() => {
    document.addEventListener('click', (e) => {
      setEmojivis(false);
    });
  }, []);

  useEffect(() => {
    if (isClear) {
      setChatContent('');
    }
  }, [isClear]);

  const commitStyle = (): string => {
    return classnames({
      [styles.commit]: true,
      [styles.commi_dis]: commitSta,
    });
  };

  const onChange = (e: any) => {
    setChatContent(e.target.value);
  };

  const onClickEmoji = (emoji: any, event: any): void => {
    event.nativeEvent.stopImmediatePropagation();
    const content =
      chatContent.substring(0, areaLocal) +
      `${emoji.native}` +
      chatContent.substring(areaLocal, chatContent.length);
    setChatContent(content);
  };

  return (
    <div
      className={commitStyle()}
      style={props.style}
      id="asdas"
      onClick={(e: any) => {
        e.nativeEvent.stopImmediatePropagation();
      }}
    >
      <TextArea
        onChange={onChange}
        id="uaual-comment"
        value={chatContent}
        autoFocus={focusSta}
        autoSize={{ minRows: 1, maxRows: 6 }}
        placeholder={placeholder}
        onBlur={() => {}}
        onFocus={() => {
          if (emojivis) {
            setEmojivis(false);
          }
        }}
      />
      <div
        className={styles.tool}
        onClick={(e: any) => {
          setFocusSta(true);
        }}
      >
        <div className={styles.card__tool}>
          <ul
            onClick={() => {
              if (emojivis) {
                setEmojivis(false);
              }
            }}
          >
            <li
              onClick={(e: any) => {
                setEmojivis(!emojivis);
                const test = document.querySelector('#uaual-comment');
                // @ts-ignore
                setareaLocal(test?.selectionEnd);
              }}
            >
              <img src={smile1} />
              表情
            </li>
            <li>
              <img src={photo} />
              图片
            </li>
          </ul>
          <SkyEmoji visible={emojivis} onClickEmoji={onClickEmoji} />
        </div>
        <Button
          disabled={!chatContent}
          type="primary"
          onClick={() => {
            sumbitForm(chatContent);
          }}
        >
          评论
        </Button>
      </div>
    </div>
  );
};

export default Comment;
