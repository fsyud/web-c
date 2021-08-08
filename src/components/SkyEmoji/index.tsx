import React from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import smile from '@/assets/svg/smile.svg';
import styles from './index.less';
import './index.css';

interface SkyEmojiProps {
  onClickEmoji: (emoji: any, event: any) => void;
  visible: boolean;
}

const SkyEmoji: React.FC<SkyEmojiProps> = (props) => {
  const { onClickEmoji, visible } = props;

  return (
    <div className={styles.skyemoji}>
      <div className={styles.emojiContainer}>
        <Picker
          set="twitter"
          style={{
            width: '440px',
            position: 'absolute',
            height: '300px',
            left: '-2px',
            zIndex: 98,
            top: '35px',
            overflow: 'hidden',
            display: `${visible ? 'block' : 'none'}`,
          }}
          onClick={(emoji, event) => onClickEmoji(emoji, event)}
        />
      </div>
    </div>
  );
};

export default SkyEmoji;
