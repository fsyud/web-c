import React, { useState, useEffect, useReducer, useRef } from 'react';
import { Divider, Radio, Affix } from 'antd';
import { useWindowScroll } from 'beautiful-react-hooks';
import { useUpdateEffect } from 'ahooks';
import { useDispatch } from 'umi';
import throttle from 'lodash/throttle';
import { Mutual } from '@/utils/mutual';
import { getArticleList } from '@/service/home';
import TagSelect from '@/components/Article/TagSelect';
import ArtList from '@/components/Article/ArtList';
import SkeletonPrivite from '@/components/SkeletonPrivite';
import BackTop from '@/components/Article/BackTop';
import { typeDefine, btnConf } from '@/constant';
import data_img from '@/assets/svg/data.svg';

import styles from './index.less';

const About: React.FC<{}> = () => {
  const dispatch = useDispatch();

  const pageSize = 10;

  useWindowScroll(Mutual.affixMenuScroller(dispatch));

  const scrollContainRef = useRef<any>(null);

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [curType, setCurType] = useState<number>(100); // 类型 一级查询
  const [radioType, setRadioType] = useState<any>(btnConf[2].type); // 二级查询

  useEffect(() => {
    window.addEventListener('scroll', throttle(onScroll, 1000));
  }, []);

  useEffect(() => {
    return () => {
      window.removeEventListener('scroll', throttle(onScroll, 1000));
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      getArtList({ curPage, where: { type: curType }, type: 'add' });
    }
  }, [curPage, isLoading, curType]);

  useUpdateEffect(() => {
    if (scrollContainRef.current) {
      if (isLoading) {
        scrollContainRef.current.removeEventListener(
          'scroll',
          throttle(onScroll, 1000),
        );
      } else {
        scrollContainRef.current.addEventListener(
          'scroll',
          throttle(onScroll, 1000),
        );
      }
    }
  }, [isLoading]);

  const getArtList = async (conf: {
    curPage?: number; // 当前页数
    where?: { type?: number }; // 查询条件
    type: string; // 类型
    sort?: any; // 排序
  }): Promise<any> => {
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

    // state 3 => 返回已审核文章
    if (where?.type === 100) {
      params.where = { ...{ state: 3 } };
    } else {
      params.where = { ...where, ...{ state: 3 } };
    }
    const res: API.reponseData = await getArticleList(params);
    if (res && Array.isArray(res.data)) {
      const { data } = res;
      setIsLoading(data.length < 10);

      setCurList({ type: type, data: res.data });
    }
  };

  // 标签搜索
  const changeTag = (pm: number): void => {
    setCurType(pm);
    setTimeout(() => {
      getArtList({ curPage: 1, where: { type: pm }, type: 'default' });
    });
  };

  const secondTypesChange = (e: any) => {
    const { value } = e.target;
    setRadioType(value);
    let sort = {};
    if (value === 1) {
      sort = {
        create_times: -1,
      };
    }
    if (value === 2) {
      sort = {
        views: 1,
      };
    }
    getArtList({
      curPage: 1,
      where: { type: curType },
      sort,
      type: 'default',
    });
  };

  const onScroll = () => {
    if (!scrollContainRef.current) return;

    const innerHeight = scrollContainRef.current?.clientHeight || 0; //容器高度
    // scrollTop在页面为滚动时为0，开始滚动后，慢慢增加，滚动到页面底部时
    // 出现innerHeight < (outerHeight + scrollTop)的情况，严格来讲，是接近底部。
    let scrollTop =
      window.pageYOffset ||
      window.document.documentElement?.scrollTop ||
      window.document.body?.scrollTop ||
      0;

    //可滚动容器超出当前窗口显示范围的高度
    let outerHeight =
      window.document.documentElement?.clientHeight ||
      window.document.body?.clientHeight ||
      0;

    // 50 偏移距离 距离底部50px的时候触发
    if (innerHeight < scrollTop + outerHeight + 10) {
      // 加载更多操作
      setCurPage((prevPage: number) => {
        return prevPage + 1;
      });
    }
  };

  return (
    <>
      <div ref={scrollContainRef} className={`${styles.home}`}>
        <div className={styles.heads}>
          <Affix offsetTop={0}>
            <div className={styles.h_tags}>
              <TagSelect
                changeTag={changeTag}
                list={[...[{ type: 100, name: '推荐' }, ...typeDefine]]}
              />
            </div>
          </Affix>
          <Divider />

          <div className={styles.h_header__link}>
            <Radio.Group
              value={radioType}
              onChange={(e: any) => secondTypesChange(e)}
              size="small"
              buttonStyle="solid"
            >
              {btnConf.map((s: GLOBAL.tagType, index: number) => (
                <Radio.Button key={index} value={s.type}>
                  {s.name}
                </Radio.Button>
              ))}
            </Radio.Group>
          </div>
          <Divider />
        </div>

        <div className={styles.h_main}>
          <ArtList item={curList} />
          {!isLoading && curList.length !== 0 && <SkeletonPrivite />}
          {isLoading && (
            <div className={styles.h_main__end}>
              <img src={data_img} alt="error" />
              <strong>没有更多...</strong>
            </div>
          )}
        </div>
      </div>
      <BackTop />
    </>
  );
};

export default About;
