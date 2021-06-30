import React, { useState } from 'react';
import { Skeleton } from 'antd';
import { useSelector } from 'dva';
import styles from './index.less';

interface ArtListProps {
  item?: any;
}

const ArtList: React.FC<ArtListProps> = (props) => {
  const { list } = useSelector(({ article }: any) => {
    return { ...article };
  });

  const ScanArticle = (): void => {
    console.log('跳转');
    window.open('/detail?id=22');
  };

  return (
    <div className={styles.art_list}>
      <Skeleton active loading={list.length === 0}>
        <ul className={styles.art_list__main}>
          {list.map((s: any, index: number) => {
            return (
              <li key={index}>
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
                  <h6 onClick={() => ScanArticle()}>{s.title}</h6>
                  <div className={styles.art_c__r___b}>
                    <div className={styles.art_c__r___b____l}>前端</div>
                    <div className={styles.art_c__r___b____r}>naze</div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Skeleton>
    </div>
  );
};

export default ArtList;
