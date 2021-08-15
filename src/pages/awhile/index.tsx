import React, { useState, useEffect } from 'react';
import { Skeleton, Card, Input, Button } from 'antd';
import {
  SmileTwoTone,
  FileImageTwoTone,
  HeartTwoTone,
} from '@ant-design/icons';
import SkyEmoji from '@/components/SkyEmoji';
import CommitBoard from '@/components/Awhile/CommitBoard';

import styles from './index.less';

const { TextArea } = Input;

interface RegardProps {}

const Regard: React.FC<RegardProps> = (props) => {
  const [emojivis, setEmojivis] = useState<boolean>(false);
  const [chatContent, setChatContent] = useState<any>('');

  useEffect(() => {
    document.addEventListener('click', (e) => {
      setEmojivis(false);
    });
  }, []);

  const onChange = (e: any) => {
    console.log(e.target.value);
    setChatContent(e.target.value);
  };

  const onClickEmoji = (emoji: any, event: any): void => {
    event.nativeEvent.stopImmediatePropagation();
    const content = chatContent + `${emoji.native}`;
    setChatContent(content);
  };

  return (
    <div className={styles.ahile}>
      <Card bordered={false} style={styles.header_card}>
        <TextArea
          placeholder="发布动态、输入留言～"
          allowClear
          onChange={onChange}
          value={chatContent}
        />
        <div className={styles.header_card__footer}>
          <div className={styles.header_card__tool}>
            <ul>
              <li
                onClick={(e: any) => {
                  e.nativeEvent.stopImmediatePropagation();
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
              <li>
                <HeartTwoTone />
                链接
              </li>
              <li></li>
            </ul>
            <SkyEmoji visible={emojivis} onClickEmoji={onClickEmoji} />
          </div>
          <Button type="primary">发布</Button>
        </div>
      </Card>

      <>
        <Card bordered={false} className={styles.awhile_content}>
          <Skeleton active loading={false}>
            <CommitBoard />
          </Skeleton>
        </Card>
      </>
    </div>
  );
};

export default Regard;
