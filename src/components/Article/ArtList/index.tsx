import React from 'react';
import { Skeleton } from 'antd';
import styles from './index.less';

interface ArtListProps {
  item: any[];
}

const ArtList: React.FC<ArtListProps> = ({ item }) => {
  const ScanArticle = (id: string): void => {
    window.open(`/detail/${id}`);
  };

  return (
    <div className={styles.art_list}>
      <Skeleton active loading={item.length === 0}>
        <ul className={styles.art_list__main}>
          {item.map((s: any, index: number) => {
            return (
              <li key={index}>
                <div className={styles.art_cont__right}>
                  <h6 onClick={() => ScanArticle(s._id)}>{s.title}</h6>
                  <div className={styles.art_footer}>
                    <div className={styles.art_footer__l}>前端</div>
                    <div className={styles.art_footer__r}>naze</div>
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
