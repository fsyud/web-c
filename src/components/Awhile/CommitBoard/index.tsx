import React, { useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import { SmileTwoTone, FileImageTwoTone } from '@ant-design/icons';
import classnames from 'classnames';
import SkyEmoji from '@/components/SkyEmoji';
import great from '@/assets/svg/great.svg';
import commit from '@/assets/svg/commit.svg';
import styles from './index.less';

const { TextArea } = Input;

const CommitBoard: React.FC<{}> = () => {
  const [emojivis, setEmojivis] = useState<boolean>(false);
  const [chatContent, setChatContent] = useState<any>('');
  const [commitSta, setCommitSta] = useState<boolean>(true);

  useEffect(() => {
    document.addEventListener('click', (e) => {
      setEmojivis(false);
      setCommitSta(true);
    });
  }, []);

  const onChange = (e: any) => {
    setChatContent(e.target.value);
  };

  const onClickEmoji = (emoji: any, event: any): void => {
    event.nativeEvent.stopImmediatePropagation();
    const content = chatContent + ` ${emoji.native} `;
    setChatContent(content);
  };

  const commitStyle = (): string => {
    return classnames({
      [styles.commit]: true,
      [styles.commi_dis]: commitSta,
    });
  };

  return (
    <div className={styles.commit_board}>
      <div className={styles.header}>
        <div className={styles.art_head}>
          <a href="">
            <img src={require('@/assets/avator.jpeg')} alt="error" />
          </a>
          <div className={styles.art_h__right}>
            <div className={styles.name}>月下</div>
            <div className={styles.meta}>
              <time>{'2020-08-09'}</time>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.main}>asdasd</div>
      <div className={styles.footer}>
        <div
          className={styles.f_one}
          onClick={(e: any) => {
            e.nativeEvent.stopImmediatePropagation();
            setCommitSta(false);
          }}
        >
          <img src={commit} alt="" />
          <strong>回复</strong>
        </div>
        <div className={styles.f_one}>
          <img src={great} alt="" />
        </div>
      </div>
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
                <SmileTwoTone />
                表情
              </li>
              <li>
                <FileImageTwoTone />
                图片
              </li>
            </ul>
            <SkyEmoji visible={emojivis} onClickEmoji={onClickEmoji} />
          </div>
          <Button type="primary">发布</Button>
        </div>
      </div>
    </div>
  );
};

export default CommitBoard;
