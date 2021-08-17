import React, { useEffect, useState } from 'react';
import { useParams, useDispatch, useSelector } from 'umi';
import { getStringDay } from '@/utils/utils';
import { Skeleton, Card, Row, Col, Affix } from 'antd';
import { useMediaQuery } from 'react-responsive';
import Tocify from '@/components/Article/MarkdownBody/tocify';
import ArtTool from '@/components/Article/ArtTool';
import BackTop from '@/components/Article/BackTop';
import MarkdownBody from '@/components/Article/MarkdownBody';
import ArticleComments from '@/components/Article/ArticleComments';

import styles from './index.less';

interface DetailProps {}

const Detail: React.FC<DetailProps> = (props) => {
  const params: any = useParams();
  const [tocify, setTocify] = useState<Tocify>();
  const dispatch = useDispatch();

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });

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
      <Row>
        <Col span={isTabletOrMobile ? 24 : 18} className={styles.teart_left}>
          <div className={styles.art_containt}>
            <Skeleton active avatar loading={!content} paragraph={{ rows: 4 }}>
              <div className={styles.art_main}>
                <div className={styles.art_head}>
                  <a href="">
                    <img src={require('@/assets/avator.jpeg')} alt="error" />
                  </a>
                  <div className={styles.art_h__right}>
                    <div className={styles.name}>月下</div>
                    <div className={styles.meta}>
                      <time>{getStringDay(create_times)}</time>
                    </div>
                  </div>
                </div>

                <Card bordered={false}>
                  {content && (
                    <MarkdownBody
                      getTocify={(tocInstance) => {
                        // console.log(tocInstance, 'tocInstance');
                        setTocify(tocInstance);
                      }}
                      markdown={content}
                      prismPlugin
                      toc
                    />
                  )}
                </Card>

                <Card
                  bordered={false}
                  style={{ marginTop: 24 }}
                  id="commentsCard"
                >
                  <ArticleComments />
                </Card>
              </div>
            </Skeleton>
          </div>
        </Col>

        {!isTabletOrMobile && (
          <Col span={6} className={styles.init_aside}>
            <section className={styles.init_section}>
              <aside>
                <div className={styles.teart_one}>
                  <h5>相关推荐</h5>
                </div>
              </aside>

              <Affix offsetTop={80}>
                <aside className={styles.init_topic}>
                  <div className={styles.teart_one}>
                    <Skeleton active loading={!content} paragraph={{ rows: 4 }}>
                      {tocify?.render()}
                    </Skeleton>
                  </div>
                </aside>
              </Affix>
            </section>
          </Col>
        )}
      </Row>

      <ArtTool />
      <BackTop />
    </div>
  );
};

export default Detail;
