import React from 'react';
import { Typography } from 'antd';

const { Paragraph } = Typography;

import ThreeDImage from '@/components/ThreeDImage';

import styles from './index.less';

const Aboout: React.FC<{}> = () => {
  return (
    <div className={styles.about}>
      <h2>about</h2>

      <Paragraph>Virgo has a strong obsessive-compulsive disorder.</Paragraph>

      <Paragraph>
        University computer major, I did not expect it in the days after.
        Associate with the computer every day.
      </Paragraph>

      <Paragraph>
        In my bones I like art and beautiful things. Such as sunlight, green
        grass, dew, dandelion, etc.
      </Paragraph>
      <Paragraph>
        Like games CrazyRacing KartRider, League of Legends. The technology is
        justified.
      </Paragraph>
      <Paragraph>
        I like novels "The Ordinary World", "A Hundred Years of Solitude",
        "Ghost Blowing Lantern", "Red Sorghum Family", etc. Friends who like to
        read can discuss together.
      </Paragraph>
      <Paragraph>
        I like basketball. I have been exposed to basketball for a long time,
        and I am good at position guards. Signature action killer crossover! !
      </Paragraph>

      <Paragraph>
        I like music. I am currently learning guitar by myself and trying my
        best to climb the grid! Friends who like guitars can communicate
        together!
      </Paragraph>

      <Paragraph>
        {' '}
        Like computers, after contacting computers, I was deeply captured by the
        computer world. This is a great thing! ! ! !{' '}
      </Paragraph>
      <Paragraph>
        {' '}
        Currently working in a medical company, mainly engaged in the
        development of react, vue and visualization{' '}
      </Paragraph>
      <h2>Can find me in these places</h2>

      <Paragraph>Email: starrystarsky7@163.com</Paragraph>
      <Paragraph>
        Github:
        <a href="https://github.com/starryskystar">@starryskystar</a>
      </Paragraph>
      <Paragraph>Telegram: @NaZe7777</Paragraph>
      <ThreeDImage />
    </div>
  );
};

export default Aboout;
