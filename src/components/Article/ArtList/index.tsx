import React from 'react';
import { Skeleton } from 'antd';
import moment from 'moment';
import eye from '@/assets/svg/eye.svg';
import great from '@/assets/svg/great.svg';
import commit from '@/assets/svg/commit.svg';

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
                <div className={styles.lsi_main}>
                  <h6>
                    <div className={styles.h6_l}>{s.author}</div>
                    <div className={styles.h6_line}></div>
                    <div className={styles.h6_r}>
                      {moment(s.create_time).format('YYYY-MM-DD')}
                    </div>
                  </h6>
                  <h5
                    className={styles.lsi_title}
                    onClick={() => ScanArticle(s._id)}
                  >
                    {s.title}
                  </h5>
                  <div className={styles.art_footer}>
                    <div className={styles.f_one}>
                      <img src={eye} alt="" />
                      <strong>12</strong>
                    </div>
                    <div className={styles.f_one}>
                      <img src={great} alt="" />
                      <strong>5</strong>
                    </div>
                    <div className={styles.f_one}>
                      <img src={commit} alt="" />
                      <strong>2</strong>
                    </div>
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
