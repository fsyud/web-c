import React from 'react';
import { Skeleton } from 'antd';
import styles from './index.less';

interface ArtListProps {
  item: any[];
}

const ArtList: React.FC<ArtListProps> = ({ item }) => {
  const ScanArticle = (id: string): void => {
    window.open(`/detail/${id}`);
    // history.push(`/detail/${id}`)
  };

  return (
    <div className={styles.art_list}>
      <Skeleton active loading={item.length === 0}>
        <ul className={styles.art_list__main}>
          {item.map((s: any, index: number) => {
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
                  <h6 onClick={() => ScanArticle(s._id)}>{s.title}</h6>
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
