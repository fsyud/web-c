import React, { useEffect } from 'react';
import styles from './index.less';
import BasicLayout from '@/layouts/BasicLayout';
import { RibbonsFun } from '@/utils/lib/bg';

export default () => {
  useEffect(() => {
    // 引入canvas背景
    RibbonsFun();
  }, []);

  return (
    <>
      <div id="myCanvas"></div>
      <div className={styles.init_page}>
        <BasicLayout />
      </div>
    </>
  );
};
