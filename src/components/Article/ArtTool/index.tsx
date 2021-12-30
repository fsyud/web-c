import React, { useState } from 'react';
import { Affix } from 'antd';
import { LikeTwoTone, MessageTwoTone } from '@ant-design/icons';
import share from '@/assets/svg/share.svg';

var QRCode = require('qrcode.react');

import styles from './index.less';

interface ArtToolProps {
  onLikesClick: () => void;
}

const ArtTool: React.FC<ArtToolProps> = ({ onLikesClick }) => {
  const [codeSta, setCodeSta] = useState<boolean>(false);

  return (
    <Affix offsetTop={120} style={{ position: 'absolute', top: 60, left: -70 }}>
      <div className={styles.art_tool}>
        <div className={styles.at_one} onClick={() => onLikesClick()}>
          <LikeTwoTone />
        </div>
        <div className={styles.at_one}>
          <a href="#all_comment">
            <MessageTwoTone />
          </a>
        </div>
        <div className={styles.at_one}>
          <img
            src={share}
            onMouseEnter={() => setCodeSta(true)}
            onMouseOut={() => setCodeSta(false)}
          />
          {codeSta && (
            <div className={styles.qrcode_main}>
              <QRCode value={document.location.href} />
            </div>
          )}
        </div>
      </div>
    </Affix>
  );
};

export default ArtTool;
