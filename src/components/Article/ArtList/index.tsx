import React from 'react';
import { Skeleton } from 'antd';
import eye from '@/assets/svg/eye.svg';
import great from '@/assets/svg/great.svg';
import commit from '@/assets/svg/commit.svg';
import ReactCover from '@/assets/ReactCover.jpeg';
import { DiffDay } from '@/utils/utils';

import styles from './index.less';
interface ArtListProps {
  item: any[];
}

const ArtList: React.FC<ArtListProps> = ({ item }) => {
  const ScanArticle = (id: string): void => {
    const w: any = window.open('about:blank');
    w.location.href = `/detail/${id}`;
  };

  return (
    <div className={styles.art_list}>
      <Skeleton active loading={item.length === 0}>
        <ul className={styles.art_list__main}>
          {item.map((s: any, index: number) => {
            return (
              <li key={index} onClick={() => ScanArticle(s._id)}>
                <div className={styles.lsi_main}>
                  <h6>
                    <div className={styles.h6_l}>{s.author}</div>
                    <div className={styles.h6_line}></div>
                    <div className={styles.h6_r}>{DiffDay(s.create_times)}</div>
                  </h6>
                  <h5 className={styles.lsi_title}>{s.title}</h5>
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
                <div className={styles.photo}>
                  <img src={ReactCover} alt="error" />
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
