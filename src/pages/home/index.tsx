import React, { useState, useEffect, useReducer } from 'react';
import { Divider, Radio } from 'antd';
import throttle from 'lodash/throttle';
import { getArticleList } from '@/service/home';
import TagSelect from '@/components/Article/TagSelect';
import ArtList from '@/components/Article/ArtList';
import SkeletonPrivite from '@/components/SkeletonPrivite';
import BackTop from '@/components/Article/BackTop';
import { typeDefine } from '@/constant';
import data_img from '@/assets/svg/data.svg';

import styles from './index.less';

const btnConf: string[] = ['本月最热', '全部热门', '最新'];

const About: React.FC<{}> = () => {
  const pageSize = 15;

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
  const [curPage, setCurPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [curNull, setCurNull] = useState<boolean>(false);
  const [curType, setCurType] = useState<number>(100);

  useEffect(() => {
    if (!isLoading) {
      getArtList({ curPage, where: { type: curType }, type: 'add' });
    }
  }, [curPage]);

  const getArtList = async (conf: {
    curPage?: number;
    where?: { type?: number };
    type: string;
  }): Promise<any> => {
    setIsLoading(true);
    const { curPage, where, type } = conf;
    let params: any = {
      page: curPage || 1,
      pageSize,
    };

    if (where?.type === 100) {
      params.where = {};
    } else {
      params.where = where;
    }
    const res: API.reponseData = await getArticleList(params);
    if (res && Array.isArray(res.data)) {
      if (res.data.length < 15) {
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

  // 标签搜索
  const changeTag = (pm: number): void => {
    setCurType(pm);
    setTimeout(() => {
      getArtList({ curPage: 1, where: { type: pm }, type: 'default' });
    });
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

  return (
    <>
      <div className={`${styles.home} home_contain`}>
        <div className={styles.h_tags}>
          <TagSelect
            changeTag={changeTag}
            list={[...[{ type: 100, name: '推荐' }, ...typeDefine]]}
          />
        </div>
        <Divider />
        <div className={styles.h_header__link}>
          <Radio.Group size="small" buttonStyle="solid">
            {btnConf.map((s: string, index: number) => (
              <Radio.Button key={index} value={index}>
                {s}
              </Radio.Button>
            ))}
          </Radio.Group>
        </div>
        <Divider />

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
      </div>
      <BackTop />
    </>
  );
};

export default About;
