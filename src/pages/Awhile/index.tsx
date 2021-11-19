import React, { useState, useEffect, useReducer } from 'react';
import { Skeleton, Card, Input, Button, message } from 'antd';
import { useSelector, useDispatch } from 'umi';
import { useWindowScroll } from 'beautiful-react-hooks';
import SkyEmoji from '@/components/SKy/SkyEmoji';
import CommitBoard from '@/components/SKy/SkyCommitBoard';
import throttle from 'lodash/throttle';
import smile1 from '@/assets/svg/smile1.svg';
import photo from '@/assets/svg/photo.svg';
import link from '@/assets/svg/link.svg';
import topic from '@/assets/svg/topic.svg';
import { addOneAwhile, getAwhileList } from '@/service/awhile';
import { StorageStore } from '@/utils/authority';
import SkyTopic from '@/components/SKy/SkyTopic';
import SkeletonPrivite from '@/components/SkeletonPrivite';
import { topicConfList } from '@/constant';
import data_img from '@/assets/svg/data.svg';

import styles from './index.less';

const { TextArea } = Input;

interface RegardProps {}

const Regard: React.FC<RegardProps> = (props) => {
  const pageSize = 15;
  let topScollerValue = 0;
  const dispatch = useDispatch();

  const { curIndex, isRefresh } = useSelector(({ awhile }: any) => {
    return { ...awhile };
  });

  const reducer = (state: any[], action: { type: string; data?: any[] }) => {
    switch (action.type) {
      case 'add':
        return [...state, ...(action.data || [])];
      case 'default':
        return [...(action.data || [])];
      case 'init':
        return [];
      default:
        throw new Error();
    }
  };

  const [curList, setCurList] = useReducer(reducer, []);
  const [curPage, setCurPage] = useState<number>(1); // 当前页
  const [isLoading, setIsLoading] = useState<boolean>(false); // 是否在请求中
  const [curNull, setCurNull] = useState<boolean>(false); // 是否有数据
  const [emojivis, setEmojivis] = useState<boolean>(false);
  const [chatContent, setChatContent] = useState<any>('');
  const [areaLocal, setareaLocal] = useState<number>(0); // 文字插入下标
  const [topicSta, setTopicSta] = useState<boolean>(false);
  const [selectTopic, setSelectTopic] = useState<string | number>(); // 当前话题

  useEffect(() => {
    document.addEventListener('click', (e) => {
      setEmojivis(false);
      setTopicSta(false);
    });

    window.addEventListener('scroll', throttle(onScroll, 1000));
  }, []);

  useEffect(() => {
    if (!isLoading && curPage !== 1) {
      getAwhile({ curPage, curTag: curIndex, type: 'add' });
    }
  }, [curPage]);

  useEffect(() => {
    setCurPage(1);
    getAwhile({ curPage: 1, curTag: curIndex, type: 'default' });
  }, [curIndex]);

  useEffect(() => {
    if (isRefresh) {
      getAwhile({ curPage: 1, curTag: curIndex, type: 'default' });

      setTimeout(() => {
        dispatch({
          type: 'awhile/IsRefresh',
          payload: {
            isRefresh: false,
          },
        });
      }, 200);
    }
  }, [isRefresh]);

  useEffect(() => {
    return () => {
      window.removeEventListener('scroll', throttle(onScroll, 1000));
    };
  }, []);

  useWindowScroll(
    throttle(() => {
      let scrollTop =
        window.pageYOffset ||
        window.document.documentElement?.scrollTop ||
        window.document.body?.scrollTop ||
        0;

      if (topScollerValue <= scrollTop) {
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

      setTimeout(() => {
        topScollerValue = scrollTop;
      });
    }, 100),
  );

  const getAwhile = async (conf: {
    curPage?: number; // 当前页数
    curTag?: number | string; // 当前标签
    type: string; // 类型
  }): Promise<any> => {
    setIsLoading(true);
    const { curPage, curTag, type } = conf;

    let params: any = {
      page: curPage || 1,
      pageSize,
      tag: curTag || 999,
    };

    const { data } = await getAwhileList(params);

    if (Array.isArray(data)) {
      if (data.length < 15) {
        if (data.length === 0) {
          setIsLoading(true);
          // 标签选择数据为0
          if (type === 'default') {
            setCurList({ type: type, data: data });
          } else {
            // 滚动行为
            setCurList({ type: 'add', data: [] });
          }
        } else {
          setCurList({ type: type, data: data });
        }
        setCurNull(true);
      } else {
        setIsLoading(false);
        setCurList({ type: type, data: data });
      }
    }
  };

  // area内容
  const onChange = (e: any) => {
    setChatContent(e.target.value);
  };

  // 表情点击
  const onClickEmoji = (emoji: any, event: any): void => {
    event.nativeEvent.stopImmediatePropagation();
    const content =
      chatContent.substring(0, areaLocal) +
      `${emoji.native}` +
      chatContent.substring(areaLocal, chatContent.length);
    setChatContent(content);
  };

  // 一级时刻提交
  const submitAwile = async (): Promise<any> => {
    if (!chatContent) {
      message.error('内容不能为空！');
      return;
    }

    const { data } = await addOneAwhile({
      user_id: StorageStore.getUserId(),
      tag: selectTopic,
      content: chatContent,
    });

    if (data) {
      message.success('发布成功，博主审核中！');
      setChatContent('');
      setSelectTopic('');

      if (curIndex === 999) {
        getAwhile({ curPage: 1, curTag: 999, type: 'default' });
      } else {
        dispatch({
          type: 'awhile/awhileIndex',
          payload: {
            curIndex: 999,
          },
        });
      }
    } else {
      message.error('发布失败！');
    }
  };

  // 时刻类型点击
  const topicClick = (value: string | number) => {
    setTopicSta(false);
    setSelectTopic(value);

    if (value === 1000) {
      setSelectTopic('');
    }
  };

  const onScroll = () => {
    const scrollElement: any = window.document.querySelector('#home_contain');
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
      //加载更多操作
      setCurPage((prevPage: number) => {
        return prevPage + 1;
      });
    }
  };

  return (
    <div className={styles.ahile} id="awhile_contain">
      <Card bordered={false} style={styles.header_card}>
        <div className={styles.head_input}>
          <TextArea
            id="awhile-comment"
            placeholder="发布动态、输入时刻～"
            allowClear
            autoSize={{ minRows: 3, maxRows: 6 }}
            onChange={onChange}
            value={chatContent}
            maxLength={1000}
          />

          {selectTopic && (
            <div className={styles.topic_pick}>
              <span>
                {
                  topicConfList.find(
                    (s: GLOBAL.tagType) => s.type === selectTopic,
                  )?.name
                }
              </span>
            </div>
          )}
        </div>

        <div className={styles.header_card__footer}>
          <div className={styles.header_card__tool}>
            <ul>
              <li
                onClick={(e: any) => {
                  e.nativeEvent.stopImmediatePropagation();
                  setEmojivis(!emojivis);
                  const test = document.querySelector('#awhile-comment');
                  // @ts-ignore
                  setareaLocal(test?.selectionEnd);
                }}
              >
                <img src={smile1} />
                表情
              </li>
              {!selectTopic && (
                <li>
                  <img src={photo} />
                  图片
                </li>
              )}

              <li>
                <img src={link} />
                链接
              </li>
              <li
                onClick={(e: any) => {
                  e.nativeEvent.stopImmediatePropagation();
                  setTopicSta(true);
                }}
              >
                <img src={topic} />
                话题
                {topicSta && <SkyTopic topicClick={topicClick} />}
              </li>
            </ul>
            <SkyEmoji visible={emojivis} onClickEmoji={onClickEmoji} />
          </div>
          <Button type="primary" onClick={submitAwile}>
            发布
          </Button>
        </div>
      </Card>

      <Skeleton
        className={styles.skeleton}
        avatar
        active
        loading={curList.length === 0}
      >
        {curList.map((s: any, i: number) => (
          <div key={i}>
            {s.state === 2 && (
              <Card bordered={false} className={styles.awhile_content}>
                <CommitBoard Item={s} />
              </Card>
            )}
          </div>
        ))}
      </Skeleton>

      {!curNull && curList.length !== 0 && <SkeletonPrivite />}
      {curNull && (
        <div className={styles.h_main__end}>
          <img src={data_img} alt="error" />
          <strong>没有更多...</strong>
        </div>
      )}
    </div>
  );
};

export default Regard;
