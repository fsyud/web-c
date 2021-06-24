import React, { FC } from 'react';
import styles from './index.less';
import { BackTop } from 'antd';
import { CaretUpOutlined } from '@ant-design/icons';

const BackTopCt: FC<{}> = () => {
  return (
    <BackTop visibilityHeight={600} duration={200}>
      <div className={styles.back_top}>
        <CaretUpOutlined />
      </div>
    </BackTop>
  );
};

export default BackTopCt;
