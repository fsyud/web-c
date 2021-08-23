import React from 'react';
import { useMediaQuery } from 'beautiful-react-hooks';
import classnames from 'classnames';

import styles from './index.less';

interface TeArtProps {
  children: React.ReactNode | React.ReactElement;
}

const TeArt: React.FC<TeArtProps> = ({ children }) => {
  const isTabletOrMobile = useMediaQuery('(max-width: 1024px)');

  const commitStyle = (): string => {
    return classnames({
      [styles.teart]: true,
      [styles.teart_isMobobile]: isTabletOrMobile,
    });
  };

  return <div className={commitStyle()}>{children}</div>;
};

export default TeArt;
