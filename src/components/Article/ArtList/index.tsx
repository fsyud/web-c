import React from 'react';
import { Skeleton } from 'antd';
import LazyLoad from 'react-lazyload';
import eye from '@/assets/svg/eye.svg';
import great from '@/assets/svg/greats.svg';
import commit from '@/assets/svg/commit.svg';
import { DiffDay, createSuperLabel } from '@/utils/utils';
import { typeDefine } from '@/constant';

import styles from './index.less';
interface ArtListProps {
  item: any[];
}

const ArtList: React.FC<ArtListProps> = ({ item }) => {
  const ScanArticle = (id: string): void => {
    createSuperLabel(`/detail/${id}`, 'art_list_click');
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
                    <div className={styles.h6_l}>
                      {s?.author_user_info?.username}
                    </div>
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
                  <LazyLoad height={130} offset={10} once>
                    {s.img_url && <img src={s.img_url || ''} />}
                  </LazyLoad>
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
