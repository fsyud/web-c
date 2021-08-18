import React, { useState, useEffect } from 'react';
import { Input, Button, Avatar } from 'antd';
import classnames from 'classnames';
import { UserOutlined } from '@ant-design/icons';
import SkyEmoji from '@/components/SKy/SkyEmoji';
import smile1 from '@/assets/svg/smile1.svg';
import photo from '@/assets/svg/photo.svg';

import styles from './index.less';

const { TextArea } = Input;

interface SkyCommentProps {
  onCommitChange: (value: string) => void;
  sumbitComment: () => void;
}

const SkyComment: React.FC<SkyCommentProps> = (props) => {
  const { onCommitChange, sumbitComment } = props;

  const [chatContent, setChatContent] = useState<any>('');
  const [emojivis, setEmojivis] = useState<boolean>(false);
  const [curemojista, setCuremojista] = useState<boolean>(true);

  useEffect(() => {
    document.addEventListener('click', (e) => {
      //   setEmojivis(false);
      setCuremojista(true);
    });
  }, []);

  const onClickEmoji = (emoji: any, event: any): void => {
    event.nativeEvent.stopImmediatePropagation();
    const content = chatContent + `${emoji.native}`;
    setChatContent(content);
  };

  const commitStyle = (): string => {
    return classnames({
      [styles.tool]: true,
      [styles.curemoji_dis]: curemojista,
    });
  };

  const onChange = (event: any): void => {
    const { value } = event.target;
    setChatContent(value);
    onCommitChange(value);
  };

  return (
    <div
      className={styles.sky_comment}
      onClick={(event: any) => {
        event.nativeEvent.stopImmediatePropagation();
      }}
    >
      <div className={styles.header}>
        <Avatar icon={<UserOutlined />} />
        <TextArea
          onChange={onChange}
          value={chatContent}
          autoSize={{ minRows: 1, maxRows: 6 }}
          placeholder="输入评论..."
          onFocus={() => {
            setCuremojista(false);
            if (emojivis) {
              setEmojivis(false);
            }
          }}
        />
      </div>

      <div className={commitStyle()}>
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
        <Button type="primary" onClick={sumbitComment}>
          评论
        </Button>
      </div>
    </div>
  );
};

export default SkyComment;
