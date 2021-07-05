import React, { useState, useEffect } from 'react';
import { useParams, useDispatch, useSelector } from 'umi';
import { Skeleton } from 'antd';
import ArtTool from '@/components/Article/ArtTool';
import BackTop from '@/components/Article/BackTop';

import styles from './index.less';

interface DetailProps {}

const Detail: React.FC<DetailProps> = (props) => {
  const params: any = useParams();
  const dispatch = useDispatch();

  const { detail } = useSelector(({ article }: any) => {
    return { ...article };
  });

  const { content } = detail;

  useEffect(() => {
    dispatch({
      type: 'article/getArticleDetail',
      payload: {
        id: params.id || 1,
      },
    });
  }, []);

  return (
    <div className={styles.art_detail}>
      <Skeleton active avatar loading={!content} paragraph={{ rows: 4 }}>
        <div className={styles.art_main}>
          <div className={styles.art_head}>
            <a href="">
              <img src={require('@/assets/icon/logo.png')} alt="error" />
            </a>
            <div className={styles.art_h__right}>
              <div className={styles.name}>月下</div>
              <div className={styles.meta}>
                <time>2021年06月23日</time>
              </div>
            </div>
          </div>

          <div className={styles.art_content}>{content}</div>
        </div>
      </Skeleton>

      <ArtTool />
      <BackTop />
    </div>
  );
};

export default Detail;
