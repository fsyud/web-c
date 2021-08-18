import React, { useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import classnames from 'classnames';
import smile1 from '@/assets/svg/smile1.svg';
import photo from '@/assets/svg/photo.svg';
import SkyEmoji from '@/components/SkyEmoji';

import styles from './Comment.less';

const { TextArea } = Input;

interface CommentProps {
  commitSta: boolean;
}

const Comment: React.FC<CommentProps> = (props) => {
  const { commitSta } = props;

  const [emojivis, setEmojivis] = useState<boolean>(false);
  const [chatContent, setChatContent] = useState<any>('');

  useEffect(() => {
    document.addEventListener('click', (e) => {
      setEmojivis(false);
    });
  }, []);

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
    const content = chatContent + `${emoji.native}`;
    setChatContent(content);
  };

  return (
    <div>
      <div
        className={commitStyle()}
        id="asdas"
        onClick={(e: any) => {
          e.nativeEvent.stopImmediatePropagation();
        }}
      >
        <TextArea
          onChange={onChange}
          value={chatContent}
          autoSize={{ minRows: 1, maxRows: 6 }}
          placeholder="输入评论..."
          onFocus={() => {
            if (emojivis) {
              setEmojivis(false);
            }
          }}
        />
        <div className={styles.tool}>
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
          <Button type="primary">评论</Button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
