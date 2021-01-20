import React, { useEffect } from 'react';
import styles from './index.less';
import { RibbonsFun } from '@/utils/lib/bg';

export default () => {
  useEffect(() => {
    RibbonsFun();
  }, []);

  return (
    <div>
      <h1 className={styles.title}>Page index1</h1>
    </div>
  );
};
