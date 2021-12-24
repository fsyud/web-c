import React, { useEffect, useState, useReducer, useMemo } from 'react';
import { useParams, useDispatch, useSelector, history } from 'umi';
import { getStringDay } from '@/utils/utils';
import throttle from 'lodash/throttle';
import classnames from 'classnames';
import { Helmet } from 'react-helmet';
import { Skeleton, Card, Row, Col, message, Tag, Space, Divider } from 'antd';
import { useMediaQuery, useWindowScroll } from 'beautiful-react-hooks';
import Tocify from '@/components/Article/MarkdownBody/tocify';
import { Mutual } from '@/utils/mutual';
import ArtTool from '@/components/Article/ArtTool';
import { getArticleList } from '@/service/home';
import BackTop from '@/components/Article/BackTop';
import MarkdownBody from '@/components/Article/MarkdownBody';
import SkyComment from '@/components/SKy/SkyComment';
import { addOneComment } from '@/service/comment';
import CommentsList from '@/components/Article/CommentsList';
import ArtList from '@/components/Article/ArtList';
import fire from '@/assets/svg/fire.svg';
import SkeletonPrivite from '@/components/SkeletonPrivite';
import data_img from '@/assets/svg/data.svg';
import { StorageStore } from '@/utils/authority';
import RightSide from './RightSide';

import { typeDefine } from '@/constant';

import styles from './index.less';

interface DetailProps {}

const Detail: React.FC<DetailProps> = (props) => {
  const params: any = useParams();
  const pageSize = 10;

  const reducer = (state: any[], action: { type: string; data?: any[] }) => {
    switch (action.type) {
      case 'add':
        return [...state, ...(action.data || [])];
      case 'init':
        return [];
      default:
        throw new Error();
    }
  };

  const [curList, setCurList] = useReducer(reducer, []);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [curPage, setCurPage] = useState<number>(1); // 当前页
  const [curNull, setCurNull] = useState<boolean>(false); // 是否有数据
  const dispatch = useDispatch();
  const [tocify, setTocify] = useState<Tocify>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false); // 是否是管理员

  const { detail, commentsList } = useSelector(({ article }: any) => {
    return { ...article };
  });

  const { content, create_times, _id, meta, type, author_user_info } = detail;

  const [commentValue, setCommentValue] = useState<string>('');
  const [clearSta, setClearSta] = useState<boolean>(false);

  const isTabletOrMobile = useMediaQuery('(max-width: 1024px)');

  useEffect(() => {
    window.scrollTo(0, 0);

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

  useEffect(() => {
    if (!isLoading && type) {
      getArtList({ curPage, where: { type }, type: 'add' });
    }
  }, [curPage, type]);

  useEffect(() => {
    // 滚动事件
    window.addEventListener('scroll', throttle(onScroll, 1000));
    // 角色判断是否可以编辑
    const userInfo = StorageStore.getUserInfoLocalStorage();

    if (userInfo && userInfo?.type === 1 + '') {
      setIsAdmin(true);
    }
  }, []);

  // 销毁滚动监听
  useEffect(() => {
    return () => {
      window.removeEventListener('scroll', throttle(onScroll, 1000));
    };
  }, []);

  /**
   * @description: 评论总条数
   * @param {*} useMemo
   * @return {*}
   */
  const commitNum = useMemo(() => {
    let total = 0;
    for (let i = 0; i < commentsList.length; i++) {
      total += commentsList[i].secondCommit.length;
    }
    total = commentsList.length + total;
    return total;
  }, [commentsList]);

  /**
   * @description: 获取文章详情
   * @param {*}
   * @return {*}
   */
  const getArtList = async (conf: {
    curPage?: number; // 当前页数
    type: string; // 类型
    where?: { type?: number }; // 查询条件
    sort?: any; // 排序
  }): Promise<any> => {
    setIsLoading(true);
    const {
      curPage,
      where,
      type,
      sort = {
        create_times: -1,
      },
    } = conf;
    let params: any = {
      page: curPage || 1,
      pageSize,
      sort,
    };

    if (where?.type === 100) {
      params.where = {};
    } else {
      params.where = where;
    }

    params.filter = { _id: { $ne: _id } };

    const res: API.reponseData = await getArticleList(params);
    if (res && Array.isArray(res.data)) {
      if (res.data.length < 10) {
        if (res.data.length === 0) {
          setIsLoading(true);
          setCurList({ type: 'init' });
        } else {
          setCurList({ type: type, data: res.data });
        }
        setCurNull(true);
      } else {
        setIsLoading(false);
        setCurList({ type: type, data: res.data });
      }
    }
  };

  useWindowScroll(Mutual.affixMenuScroller(dispatch));

  const onScroll = () => {
    const scrollElement: any = window.document.querySelector('.home_contain');

    if (!scrollElement) return;

    let innerHeight = scrollElement?.clientHeight || 0; //屏幕尺寸高度
    //可滚动容器超出当前窗口显示范围的高度
    let outerHeight =
      window.document.documentElement?.clientHeight ||
      window.document.body?.clientHeight ||
      0;
    // scrollTop在页面为滚动时为0，开始滚动后，慢慢增加，滚动到页面底部时
    // 出现innerHeight < (outerHeight + scrollTop)的情况，严格来讲，是接近底部。
    let scrollTop =
      window.pageYOffset ||
      window.document.documentElement?.scrollTop ||
      window.document.body?.scrollTop ||
      0;

    if (innerHeight < outerHeight + scrollTop && !isLoading) {
      // 加载更多操作
      setCurPage((prevPage: number) => {
        return prevPage + 1;
      });
    }
  };

  /**
   * @description: 评论输入框改变
   * @param {string} value
   * @return {*}
   */
  const onCommitChange = (value: string) => {
    setCommentValue(value);
  };

  /**
   * @description: 一级评论提交
   * @param {*} Promise
   * @return {*}
   */
  const sumbitComment = async (): Promise<any> => {
    if (!StorageStore.getUserId()) {
      message.error('请登录后评论！');
      return;
    }

    const res = await addOneComment({
      article_id: _id,
      user_id: StorageStore.getUserId(),
      content: commentValue,
      name: '',
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

  // 博主角色可直接编辑文章
  const EditArticle = (): void => {
    history.push('/writeArt?id=' + _id);
  };

  const commitStyle = (): string => {
    return classnames({
      [styles.footer_list]: true,
      [styles.footer_list__isMobobile]: isTabletOrMobile,
    });
  };

  return (
    <div className={`${styles.art_detail} home_contain`}>
      <Row>
        <Helmet>
          <title>{detail?.title ? detail.title : '无标题'}</title>
        </Helmet>
        <Col span={isTabletOrMobile ? 24 : 18} className={styles.teart_left}>
          <div className={styles.art_containt}>
            <Skeleton active avatar loading={!content} paragraph={{ rows: 4 }}>
              <div className={styles.art_main}>
                <div className={styles.art_head}>
                  <a href="">
                    <img src={author_user_info?.avatar_url} />
                  </a>
                  <div className={styles.art_h__right}>
                    <div className={styles.name}>
                      {author_user_info?.username}
                    </div>
                    <div className={styles.meta}>
                      <time>{getStringDay(create_times)}</time>
                      <span>阅读 {meta?.views}</span>
                      {isAdmin && (
                        <span className={styles.edit} onClick={EditArticle}>
                          . 编辑
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {/* 文章内容 */}
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
                  <div id="all_comment" className={styles.comment_head}>
                    全部评论（{commitNum}）
                    <img src={fire} />
                  </div>
                  <CommentsList commentList={commentsList} />
                </Card>
              </div>
            </Skeleton>
          </div>

          <div className={commitStyle()}>
            <Skeleton active loading={!content} paragraph={{ rows: 1 }}>
              <h1>相关推荐</h1>
              <Card bordered={false}>
                <div className={styles.h_main}>
                  <ArtList item={curList} />
                  {!curNull && curList.length !== 0 && <SkeletonPrivite />}
                  {curNull && (
                    <div className={styles.h_main__end}>
                      <img src={data_img} alt="error" />
                      <strong>没有更多...</strong>
                    </div>
                  )}
                </div>
              </Card>
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
