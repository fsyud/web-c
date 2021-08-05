import React, { useEffect } from 'react';
import { useParams, useDispatch, useSelector } from 'umi';
import { getStringDay } from '@/utils/utils';
import { Skeleton, Card } from 'antd';
import ArtTool from '@/components/Article/ArtTool';
import BackTop from '@/components/Article/BackTop';
import MarkdownBody from '@/components/Article/MarkdownBody';
import ArticleComments from '@/components/Article/ArticleComments';

import styles from './index.less';

interface DetailProps {}

const Detail: React.FC<DetailProps> = (props) => {
  const params: any = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    // window.location.reload()
  }, []);

  useEffect(() => {
    dispatch({
      type: 'article/getArticleDetail',
      payload: {
        id: params.id || 1,
      },
    });
  }, []);

  const { detail } = useSelector(({ article }: any) => {
    return { ...article };
  });

  const { content, create_times } = detail;

  return (
    <div className={styles.art_detail}>
      <Skeleton active avatar loading={!content} paragraph={{ rows: 4 }}>
        <div className={styles.art_main}>
          <div className={styles.art_head}>
            <a href="">
              <img src={require('@/assets/icon/pencil.png')} alt="error" />
            </a>
            <div className={styles.art_h__right}>
              <div className={styles.name}>月下</div>
              <div className={styles.meta}>
                <time>{getStringDay(create_times)}</time>
              </div>
            </div>
          </div>

          <Card bordered={false}>
            <MarkdownBody markdown={content} />
          </Card>

          <Card bordered={false} style={{ marginTop: 24 }} id="commentsCard">
            <ArticleComments />
          </Card>
        </div>
      </Skeleton>

      <ArtTool />
      <BackTop />
    </div>
  );
};

export default Detail;
