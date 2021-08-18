import React from 'react';
import { Skeleton } from 'antd';
import eye from '@/assets/svg/eye.svg';
import great from '@/assets/svg/great.svg';
import commit from '@/assets/svg/commit.svg';
import { DiffDay } from '@/utils/utils';
import { typeDefine } from '@/constant';

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
                    <div className={styles.h6_line}></div>
                    <div>
                      {
                        typeDefine.find((a: GLOBAL.tagType) => a.type == s.type)
                          ?.name
                      }
                    </div>
                  </h6>
                  <h5 className={styles.lsi_title}>{s.title}</h5>
                  <h3>{s.desc}</h3>
                  <div className={styles.art_footer}>
                    <div className={styles.f_one}>
                      <img src={eye} alt="" />
                      <strong>{s?.meta?.views || 0}</strong>
                    </div>
                    <div className={styles.f_one}>
                      <img src={great} alt="" />
                      <strong>{s?.meta?.likes || 0}</strong>
                    </div>
                    <div className={styles.f_one}>
                      <img src={commit} alt="" />
                      <strong>{s?.meta?.comments || 0}</strong>
                    </div>
                  </div>
                </div>
                <div className={styles.photo}>
                  {s.img_url && <img src={s.img_url || ''} />}
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
