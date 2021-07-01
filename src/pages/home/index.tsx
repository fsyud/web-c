import React, { useState, useEffect } from 'react';
import { Divider, Button } from 'antd';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'dva';
import TagSelect from '@/components/Article/TagSelect';
import ArtList from '@/components/Article/ArtList';

import styles from './index.less';

interface AboutProps {}

const btnConf: string[] = ['本月最热', '全部热门', '最新'];

const About: React.FC<AboutProps> = (props) => {
  const dispatch = useDispatch();

  const [btnType, setBtnType] = useState<number>();

  useEffect(() => {
    dispatch({
      type: 'article/fetchArticle',
    });
  }, [dispatch]);

  const TypeClick = (pm: number): void => {
    setBtnType(pm);
  };

  const btnStyle = (pm: number): string => {
    return classnames({
      [styles.active]: btnType === pm,
    });
  };

  return (
    <div className={styles.home}>
      <div className={styles.h_tags}>
        <TagSelect list={[1, 2, 3, 4, 5, 6, 7, 8, 9]} />
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
        <ArtList />
      </div>
    </div>
  );
};

export default About;
