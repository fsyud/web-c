import React from 'react';
import classnames from 'classnames';
import { useMediaQuery } from 'beautiful-react-hooks';
import styles from './index.less';

interface TeFirstProps {
  children: React.ReactNode | React.ReactElement;
}

const TeFirst: React.FC<TeFirstProps> = ({ children }) => {
  const isTabletOrMobile = useMediaQuery('(max-width: 1024px)');

  const teFirstStyle = () => {
    return classnames({
      [styles.te_fiststyle]: isTabletOrMobile,
    });
  };

  return (
    <div className={styles.te_first}>
      {!isTabletOrMobile && <div className={styles.pc_main}>{children}</div>}

      {isTabletOrMobile && <div className={styles.mobile_main}>{children}</div>}
    </div>
  );
};

export default TeFirst;
