import React from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import smile from '@/assets/svg/smile.svg';
import styles from './index.less';
import './index.css';

interface SkyEmojiProps {
  onClickEmoji: (emoji: any, event: any) => void;
}

const SkyEmoji: React.FC<SkyEmojiProps> = (props) => {
  const { onClickEmoji } = props;

  return (
    <div className={styles.skyemoji}>
      <div className={styles.emojiContainer}>
        <Picker
          set="twitter"
          style={{
            width: '440px',
            position: 'absolute',
            height: '320px',
            left: '-2px',
            top: '35px',
            overflow: 'hidden',
            display: `${'block'}`,
          }}
          onClick={(emoji, event) => onClickEmoji(emoji, event)}
        />
      </div>
    </div>
  );
};

export default SkyEmoji;
