import React from 'react';
import styles from './index.less';

interface TeArtProps {
  children: React.ReactNode | React.ReactElement;
}

const TeArt: React.FC<TeArtProps> = ({ children }) => {
  return <div className={styles.teart}>{children}</div>;
};

export default TeArt;
