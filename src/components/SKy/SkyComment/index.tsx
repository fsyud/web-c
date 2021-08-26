import React, { useState, useEffect } from 'react';
import { Input, Button, Avatar } from 'antd';
import classnames from 'classnames';
import { UserOutlined } from '@ant-design/icons';
import SkyEmoji from '@/components/SKy/SkyEmoji';
import smile1 from '@/assets/svg/smile1.svg';
import photo from '@/assets/svg/photo.svg';
import { StorageStore } from '@/utils/authority';

import styles from './index.less';

const { TextArea } = Input;

interface SkyCommentProps {
  onCommitChange: (value: string) => void; // 输入框value变化
  sumbitComment: () => void; // 提交
  clear: boolean;
}

const SkyComment: React.FC<SkyCommentProps> = (props) => {
  const { onCommitChange, sumbitComment, clear = false } = props;
  const [chatContent, setChatContent] = useState<any>('');
  const [emojivis, setEmojivis] = useState<boolean>(false);

  const [inputState, setInputState] = useState<boolean>(true);
  const [areaLocal, setareaLocal] = useState<number>(0);

  useEffect(() => {
    document.addEventListener('click', (e) => {
      setInputState(true);
    });
  }, []);

  useEffect(() => {
    if (clear) {
      setChatContent('');
    }
  }, [clear]);

  const onClickEmoji = (emoji: any, event: any): void => {
    event.nativeEvent.stopImmediatePropagation();
    const content =
      chatContent.substring(0, areaLocal) +
      `${emoji.native}` +
      chatContent.substring(areaLocal, chatContent.length);
    setChatContent(content);
    onCommitChange(content);
  };

  const onChange = (event: any): void => {
    const { value } = event.target;
    setChatContent(value);
    onCommitChange(value);
  };

  const commitToolStyle = (): string => {
    return classnames({
      [styles.card__tool]: true,
      [styles.card__tool__dis]: inputState,
    });
  };

  return (
    <div
      className={styles.sky_comment}
      onClick={(event: any) => {
        event.nativeEvent.stopImmediatePropagation();
      }}
    >
      <div className={styles.header}>
        {StorageStore.getUserInfoLocalStorage() ? (
          <img src={StorageStore.getUserInfoLocalStorage()?.avatar_url} />
        ) : (
          <Avatar icon={<UserOutlined />} />
        )}
        <TextArea
          id="sky-comment"
          onChange={(e) => {
            onChange(e);
          }}
          value={chatContent}
          autoSize={{ minRows: 3, maxRows: 6 }}
          placeholder="输入评论..."
          onFocus={() => {
            setInputState(false);
            if (emojivis) {
              setEmojivis(false);
            }
          }}
        />
      </div>

      <div className={styles.tool}>
        <div className={commitToolStyle()}>
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
                const test = document.querySelector('#sky-comment');
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
          className={`${!inputState && !chatContent && styles.focus_btn}`}
          disabled={chatContent.length > 0 ? false : true}
          type="primary"
          onClick={sumbitComment}
        >
          评论
        </Button>
      </div>
    </div>
  );
};

export default SkyComment;
