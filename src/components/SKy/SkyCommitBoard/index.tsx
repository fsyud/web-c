import React, { useState, useEffect } from 'react';
import { DiffDay } from '@/utils/utils';
import great from '@/assets/svg/great.svg';
import commit from '@/assets/svg/commit.svg';
import { topicConfList } from '@/constant';
import Comment from './Comment';
import styles from './index.less';

interface SkyCommitBoardProps {
  Item: any;
}

const SkyCommitBoard: React.FC<SkyCommitBoardProps> = (props) => {
  const { Item } = props;
  const [commitSta, setCommitSta] = useState<boolean>(true);

  const { oneWhile } = Item;

  useEffect(() => {
    document.addEventListener('click', (e) => {
      setCommitSta(true);
    });
  }, []);

  const sumbitForm = (values: string) => {
    console.log(values);
  };

  return (
    <div className={styles.commit_board}>
      <div className={styles.header}>
        <div className={styles.art_head}>
          <a href="">
            <img src={require('@/assets/avator.jpeg')} alt="error" />
          </a>
          <div className={styles.art_h__right}>
            <div className={styles.name}>{oneWhile?.user_name}</div>
            <div className={styles.meta}>
              <time>{DiffDay(oneWhile?.create_times)}</time>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.main}>{oneWhile?.content}</div>
      {Item?.tag !== 999 && (
        <div className={styles.tags}>
          #
          {
            topicConfList.find((s: GLOBAL.tagType) => s.type === Item?.tag)
              ?.name
          }
          #
        </div>
      )}

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
      <Comment sumbitForm={sumbitForm} commitSta={commitSta} />
    </div>
  );
};

export default SkyCommitBoard;
