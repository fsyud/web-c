import React from 'react';
import styles from './index.less';

interface TeFirstProps {
  children: React.ReactNode | React.ReactElement;
}

const TeFirst: React.FC<TeFirstProps> = ({ children }) => {
  return <div className={styles.te_first}>{children}</div>;
};

export default TeFirst;
