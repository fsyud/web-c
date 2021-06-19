import React from 'react';
import { Skeleton, Tag, Divider } from 'antd';

import styles from './index.less';

interface AboutProps {}

const About: React.FC<AboutProps> = (props) => {
  return (
    <div className={styles.home}>
      <div className={styles.h_tags}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((s: any, index: number) => {
          return (
            <Tag key={index} color="blue">
              测试1
            </Tag>
          );
        })}
        <Tag>更多...</Tag>
      </div>
      <Skeleton active />
    </div>
  );
};

export default About;
