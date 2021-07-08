import React, { useState, useEffect, useReducer } from 'react';
import { Divider, Button } from 'antd';
import classnames from 'classnames';
import throttle from 'lodash/throttle';
import { getArticleList } from '@/service/home';
import TagSelect from '@/components/Article/TagSelect';
import ArtList from '@/components/Article/ArtList';
import SkeletonPrivite from '@/components/SkeletonPrivite';

import styles from './index.less';

const btnConf: string[] = ['本月最热', '全部热门', '最新'];

const About: React.FC<{}> = () => {
  const pageSize = 15;

  const reducer = (state: any[], action: { type: string; data: any[] }) => {
    switch (action.type) {
      case 'add':
        return [...state, ...action.data];
      case 'init':
        return [];
      default:
        throw new Error();
    }
  };

  const [btnType, setBtnType] = useState<number>();
  const [curList, setCurList] = useReducer(reducer, []);
  const [curPage, setCurPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [curNull, setCurNull] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoading) {
      getArtList(curPage);
    }
  }, [curPage]);

  const getArtList = async (params: number): Promise<any> => {
    setIsLoading(true);

    const res: API.reponseData = await getArticleList({
      page: params,
      pageSize,
    });
    if (res) {
      if (Array.isArray(res.data) && res.data.length === 0) {
        setIsLoading(true);
        setCurNull(true);
      } else {
        setIsLoading(false);
        setCurList({ type: 'add', data: res.data });
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', throttle(onScroll, 1000));
  }, []);

  useEffect(() => {
    return () => {
      window.removeEventListener('scroll', throttle(onScroll, 1000));
    };
  }, []);

  const onScroll = () => {
    const scrollElement: any = window.document.querySelector('.home_contain');
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

  const TypeClick = (pm: number): void => {
    setBtnType(pm);
  };

  const btnStyle = (pm: number): string => {
    return classnames({
      [styles.active]: btnType === pm,
    });
  };

  return (
    <div className={`${styles.home} home_contain`}>
      <div className={styles.h_tags}>
        <TagSelect list={[1, 2, 3]} />
      </div>
      <Divider />
      <div className={styles.h_header__link}>
        {btnConf.map((s: any, index: number) => {
          return (
            <Button
              className={btnStyle(index)}
              onClick={() => TypeClick(index)}
              type="link"
              key={index}
            >
              {s}
            </Button>
          );
        })}
      </div>
      <Divider />

      <div className={styles.h_main}>
        <ArtList item={curList} />
        {!curNull && curList.length !== 0 && <SkeletonPrivite />}
        {curNull && <div className={styles.h_main__end}>没有更多...</div>}
      </div>
    </div>
  );
};

export default About;
