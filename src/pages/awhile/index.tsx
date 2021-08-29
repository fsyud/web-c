import React, { useState, useEffect } from 'react';
import { Skeleton, Card, Input, Button } from 'antd';
import SkyEmoji from '@/components/SKy/SkyEmoji';
import CommitBoard from '@/components/SKy/SkyCommitBoard';
import smile1 from '@/assets/svg/smile1.svg';
import photo from '@/assets/svg/photo.svg';
import link from '@/assets/svg/link.svg';
import topic from '@/assets/svg/topic.svg';
import { addOneAwhile, getAwhileList } from '@/service/awhile';
import { StorageStore } from '@/utils/authority';
import SkyTopic from '@/components/SKy/SkyTopic';
import { topicConfList } from '@/constant';

import styles from './index.less';

const { TextArea } = Input;

interface RegardProps {}

const Regard: React.FC<RegardProps> = (props) => {
  const [emojivis, setEmojivis] = useState<boolean>(false);
  const [chatContent, setChatContent] = useState<any>('');
  const [areaLocal, setareaLocal] = useState<number>(0); // 文字插入下标
  const [topicSta, setTopicSta] = useState<boolean>(false);
  const [selectTopic, setSelectTopic] = useState<string | number>();

  useEffect(() => {
    document.addEventListener('click', (e) => {
      setEmojivis(false);
      setTopicSta(false);
    });
  }, []);

  useEffect(() => {
    getAwhile();
  }, []);

  const getAwhile = async (): Promise<any> => {
    const data = await getAwhileList({});
    console.log(data);
  };

  // area内容
  const onChange = (e: any) => {
    setChatContent(e.target.value);
  };

  // 表情点击
  const onClickEmoji = (emoji: any, event: any): void => {
    event.nativeEvent.stopImmediatePropagation();
    const content =
      chatContent.substring(0, areaLocal) +
      `${emoji.native}` +
      chatContent.substring(areaLocal, chatContent.length);
    setChatContent(content);
  };

  // 一级时刻提交
  const submitAwile = async (): Promise<any> => {
    const data = await addOneAwhile({
      user_id: StorageStore.getUserId(),
      tag: selectTopic,
      content: chatContent,
    });

    console.log(data);
  };

  // 时刻类型点击
  const topicClick = (value: string | number) => {
    setTopicSta(false);
    setSelectTopic(value);

    if (value === 1000) {
      setSelectTopic('');
    }
  };

  return (
    <div className={styles.ahile}>
      <Card bordered={false} style={styles.header_card}>
        <div className={styles.head_input}>
          <TextArea
            id="awhile-comment"
            placeholder="发布动态、输入时刻～"
            allowClear
            autoSize={{ minRows: 3, maxRows: 6 }}
            onChange={onChange}
            value={chatContent}
          />

          {selectTopic && (
            <div className={styles.topic_pick}>
              <span>
                {
                  topicConfList.find(
                    (s: GLOBAL.tagType) => s.type === selectTopic,
                  )?.name
                }
              </span>
            </div>
          )}
        </div>

        <div className={styles.header_card__footer}>
          <div className={styles.header_card__tool}>
            <ul>
              <li
                onClick={(e: any) => {
                  e.nativeEvent.stopImmediatePropagation();
                  setEmojivis(!emojivis);
                  const test = document.querySelector('#awhile-comment');
                  // @ts-ignore
                  setareaLocal(test?.selectionEnd);
                }}
              >
                <img src={smile1} />
                表情
              </li>
              {!selectTopic && (
                <li>
                  <img src={photo} />
                  图片
                </li>
              )}

              <li>
                <img src={link} />
                链接
              </li>
              <li
                onClick={(e: any) => {
                  e.nativeEvent.stopImmediatePropagation();
                  setTopicSta(true);
                }}
              >
                <img src={topic} />
                话题
                {topicSta && <SkyTopic topicClick={topicClick} />}
              </li>
            </ul>
            <SkyEmoji visible={emojivis} onClickEmoji={onClickEmoji} />
          </div>
          <Button type="primary" onClick={submitAwile}>
            发布
          </Button>
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
