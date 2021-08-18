import React, { useState, useEffect } from 'react';
import great from '@/assets/svg/great.svg';
import commit from '@/assets/svg/commit.svg';
import Comment from './Comment';
import styles from './index.less';

const CommitBoard: React.FC<{}> = () => {
  const [commitSta, setCommitSta] = useState<boolean>(true);

  useEffect(() => {
    document.addEventListener('click', (e) => {
      setCommitSta(true);
    });
  }, []);

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
      <Comment commitSta={commitSta} />
    </div>
  );
};

export default CommitBoard;
