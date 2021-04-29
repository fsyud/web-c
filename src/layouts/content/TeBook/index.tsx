import React from 'react';
import styles from './index.less';

interface TeBookProps {
  children: React.ReactNode | React.ReactElement;
}

const TeBook: React.FC<TeBookProps> = ({ children }) => {
  return (
    <div className={styles.tebook}>
      <section>{children}</section>
    </div>
  );
};

export default TeBook;
