import React, { useEffect, useState } from 'react';
import { useParams, useDispatch, useSelector } from 'umi';
import { getStringDay } from '@/utils/utils';
import throttle from 'lodash/throttle';
import { Skeleton, Card, Row, Col, message, Tag, Space, Divider } from 'antd';
import { useMediaQuery, useWindowScroll } from 'beautiful-react-hooks';
import Tocify from '@/components/Article/MarkdownBody/tocify';
import ArtTool from '@/components/Article/ArtTool';
import BackTop from '@/components/Article/BackTop';
import MarkdownBody from '@/components/Article/MarkdownBody';
import SkyComment from '@/components/SKy/SkyComment';
import { addOneComment } from '@/service/comment';
import CommentsList from '@/components/Article/CommentsList';
import fire from '@/assets/svg/fire.svg';
import RightSide from './RightSide';

import { typeDefine } from '@/constant';

import styles from './index.less';

interface DetailProps {}

const Detail: React.FC<DetailProps> = (props) => {
  const params: any = useParams();
  const dispatch = useDispatch();
  const [tocify, setTocify] = useState<Tocify>();
  const { detail, commentsList } = useSelector(({ article }: any) => {
    return { ...article };
  });

  const { content, create_times, _id, meta, type, author_user_info } = detail;
  const [commentValue, setCommentValue] = useState<string>('');
  const [clearSta, setClearSta] = useState<boolean>(false);

  const isTabletOrMobile = useMediaQuery('(max-width: 1024px)');

  useEffect(() => {
    dispatch({
      type: 'article/getArticleDetail',
      payload: {
        id: params.id || 1,
      },
    });

    dispatch({
      type: 'article/getComments',
      payload: {
        article_id: params.id || 1,
      },
    });
  }, []);

  useWindowScroll(
    throttle(() => {
      if (window.scrollY > 10) {
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
    }, 100),
  );

  const onCommitChange = (value: string) => {
    setCommentValue(value);
  };

  const sumbitComment = async (): Promise<any> => {
    if (!localStorage.STARRY_STAR_SKY_ID) {
      message.error('请登录后评论！');
      return;
    }

    const res = await addOneComment({
      article_id: _id,
      user_id: localStorage.STARRY_STAR_SKY_ID,
      content: commentValue,
      name: '纳兹',
    });

    if (res.code === 0) {
      message.success(res.data.msg);
      setClearSta(true);
      setTimeout(() => {
        setClearSta(false);
      }, 200);
      dispatch({
        type: 'article/getComments',
        payload: {
          article_id: params.id || 1,
        },
      });
    } else {
      message.error('评论失败！');
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
                    <img src={author_user_info?.avator_url} alt="avator" />
                  </a>
                  <div className={styles.art_h__right}>
                    <div className={styles.name}>
                      {author_user_info?.username}
                    </div>
                    <div className={styles.meta}>
                      <time>{getStringDay(create_times)}</time>
                      <span>阅读 {meta?.views}</span>
                    </div>
                  </div>
                </div>
                {/* 文章内容 */}
                <Card bordered={false}>
                  {content && (
                    <div className={styles.marks}>
                      <MarkdownBody
                        getTocify={(tocInstance) => {
                          setTocify(tocInstance);
                        }}
                        markdown={content}
                        prismPlugin
                        toc
                      />
                    </div>
                  )}
                </Card>
                {/* 评论 */}
                <Divider />
                <Space direction="vertical">
                  <div className={styles.footer}>
                    文章分类
                    <Tag color="#f2f4f5">
                      {
                        typeDefine.find(
                          (s: GLOBAL.tagType) => Number(type) === s.type,
                        )?.name
                      }
                    </Tag>
                  </div>
                  <SkyComment
                    onCommitChange={onCommitChange}
                    sumbitComment={sumbitComment}
                    clear={clearSta}
                  />
                </Space>
                <Card bordered={false} className={styles.comment_card}>
                  <div className={styles.comment_head}>
                    热门评论
                    <img src={fire} />
                  </div>
                  <CommentsList commentList={commentsList} />
                </Card>
              </div>
            </Skeleton>
          </div>

          <div className={styles.footer_list}>
            <Skeleton active loading={!content} paragraph={{ rows: 1 }}>
              <Card bordered={false}>列表</Card>
            </Skeleton>
          </div>
        </Col>

        {!isTabletOrMobile && (
          <Col span={6}>
            <RightSide detail={detail} tocify={tocify} />
          </Col>
        )}
      </Row>

      <ArtTool />
      <BackTop />
    </div>
  );
};

export default Detail;
