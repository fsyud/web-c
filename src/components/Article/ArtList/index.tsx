import React, { useState } from 'react';
import styles from './index.less';

interface ArtListProps {
  item?: any;
}

const ArtList: React.FC<ArtListProps> = (props) => {
  const ScanArticle = (): void => {
    console.log('跳转');
  };

  return (
    <div className={styles.art_list}>
      <ul>
        <li>
          <div className={styles.art_cont__left}>
            <div className={styles.art_c__l___one}>
              <span>4</span>
              <span>评论</span>
            </div>

            <div className={styles.art_c__l___two}>
              <span>99+</span>
              <span>阅读</span>
            </div>
          </div>

          <div className={styles.art_cont__right}>
            <h6 onClick={() => ScanArticle()}>
              for...of 循环含有辅助平面字符的字符串，输出让我感到困惑
            </h6>
            <div className={styles.art_c__r___b}>
              <div className={styles.art_c__r___b____l}>前端</div>
              <div className={styles.art_c__r___b____r}>naze</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ArtList;
