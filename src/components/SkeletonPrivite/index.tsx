import React from 'react';
import styles from './index.less';

const SkeletonPrivite: React.FC<{}> = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeleton_avatar}></div>
      <div className={styles.skeleton_body}>
        <div className={styles.skeleton_title}></div>
        <div className={styles.skeleton_content}></div>
      </div>
    </div>
  );
};

export default SkeletonPrivite;
