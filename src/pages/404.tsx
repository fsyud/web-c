import { Button } from 'antd';
import React from 'react';
import { history } from 'umi';
import error from '@/assets/svg/Error.svg';
import styles from './404.less';

const NoFoundPage: React.FC<{}> = () => {
  return (
    <div className={styles.falut_page}>
      <h3>页面好像丢了呢！</h3>
      <img src={error} />
      <Button
        style={{ marginTop: 20 }}
        type="primary"
        onClick={() => history.push('./home')}
      >
        返回首页
      </Button>
    </div>
  );
};

export default NoFoundPage;
