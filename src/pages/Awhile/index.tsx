import React, { useState } from 'react';
import { Skeleton, Card, Input, Button } from 'antd';
import SkyEmoji from '@/components/SkyEmoji';
import { SmileTwoTone } from '@ant-design/icons';

import styles from './index.less';

const { TextArea } = Input;

interface RegardProps {}

const Regard: React.FC<RegardProps> = (props) => {
  const [emojivis, setEmojivis] = useState<boolean>(false);
  const [chatContent, setChatContent] = useState<any>();

  const onChange = (e: any) => {
    console.log(e.target.value);
    setChatContent(e.target.value);
  };

  const onClickEmoji = (emoji: any, event: any): void => {
    console.log('emoji, event=====', emoji, event);

    setChatContent(emoji.native);
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
              <li onClick={() => setEmojivis(!emojivis)}>
                <SmileTwoTone />
                表情
              </li>
              <li>
                <SmileTwoTone />
                图片
              </li>
              <li>
                <SmileTwoTone />
                链接
              </li>
              <li></li>
            </ul>
            {emojivis && <SkyEmoji onClickEmoji={onClickEmoji} />}
          </div>
          <Button type="primary">发布</Button>
        </div>
      </Card>

      <Skeleton active />
    </div>
  );
};

export default Regard;
