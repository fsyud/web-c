import React, { useState } from 'react';
import { Affix } from 'antd';
import {
  LikeTwoTone,
  MessageTwoTone,
  ShareAltOutlined,
} from '@ant-design/icons';

import styles from './index.less';

interface ArtToolProps {}

const ArtTool: React.FC<ArtToolProps> = (props) => {
  return (
    <Affix offsetTop={120} style={{ position: 'absolute', top: 60, left: -70 }}>
      <div className={styles.art_tool}>
        <div className={styles.at_one}>
          <LikeTwoTone />
        </div>
        <div className={styles.at_one}>
          <MessageTwoTone />
        </div>
        <div className={styles.at_one}>
          <ShareAltOutlined />
        </div>
      </div>
    </Affix>
  );
};

export default ArtTool;
