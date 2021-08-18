import React, { useEffect, useState } from 'react';
import { useParams, useDispatch, useSelector } from 'umi';
import { getStringDay } from '@/utils/utils';
import throttle from 'lodash/throttle';
import { Skeleton, Card, Row, Col, Affix, message } from 'antd';
import { useMediaQuery } from 'react-responsive';
import Tocify from '@/components/Article/MarkdownBody/tocify';
import ArtTool from '@/components/Article/ArtTool';
import BackTop from '@/components/Article/BackTop';
import MarkdownBody from '@/components/Article/MarkdownBody';
import SkyComment from '@/components/SKy/SkyComment';

import { addOneComment } from '@/service/comment';

import styles from './index.less';

interface DetailProps {}

const Detail: React.FC<DetailProps> = (props) => {
  const params: any = useParams();
  const dispatch = useDispatch();
  const [tocify, setTocify] = useState<Tocify>();
  const { detail } = useSelector(({ article }: any) => {
    return { ...article };
  });

  const { content, create_times, _id } = detail;
  const [commentValue, setCommentValue] = useState<string>('');

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });

  useEffect(() => {
    dispatch({
      type: 'article/getArticleDetail',
      payload: {
        id: params.id || 1,
      },
    });
  }, []);

  useEffect(() => {
    // 监听滚动
    window.addEventListener('scroll', throttle(onScroll, 500));
  }, []);

  const onScroll = () => {
    // scrollTop在页面为滚动时为0，开始滚动后，慢慢增加，滚动到页面底部时
    // 出现innerHeight < (outerHeight + scrollTop)的情况，严格来讲，是接近底部。
    let scrollTop =
      window.pageYOffset ||
      window.document.documentElement?.scrollTop ||
      window.document.body?.scrollTop ||
      0;

    if (scrollTop > 110) {
      dispatch({
        type: 'global/getScroller',
        payload: {
          scroller: true,
        },
      });
    } else {
      dispatch({
        type: 'global/getScroller',
        payload: {
          scroller: false,
        },
      });
    }
  };

  useEffect(() => {}, []);

  const onCommitChange = (value: string) => {
    setCommentValue(value);
  };

  const sumbitComment = async (): Promise<any> => {
    const res = await addOneComment({
      article_id: _id,
      user_id: '610c01ea6968080f8c845e1f',
      content: commentValue,
    });

    if (res.code === 0) {
      message.success(res.data.msg);
    }
  };

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
                {/* 文章内容 */}
                <Card bordered={false}>
                  {content && (
                    <MarkdownBody
                      getTocify={(tocInstance) => {
                        setTocify(tocInstance);
                      }}
                      markdown={content}
                      prismPlugin
                      toc
                    />
                  )}
                </Card>
                {/* 评论 */}
                <Card bordered={false} className={styles.comment_card}>
                  <SkyComment
                    onCommitChange={onCommitChange}
                    sumbitComment={sumbitComment}
                  />
                </Card>
              </div>
            </Skeleton>
          </div>

          <div className={styles.footer_list}>
            <Skeleton active avatar loading={!content} paragraph={{ rows: 4 }}>
              <Card bordered={false}>列表</Card>
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

              <Affix offsetTop={16}>
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
