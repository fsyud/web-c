import React, { useEffect, useState } from 'react';
import Tocify from '@/components/Article/MarkdownBody/tocify';
import { Skeleton, Affix, Avatar } from 'antd';
import { getArticleList } from '@/service/home';

import locationSvg from '@/assets/svg/location.svg';
import githubSvg from '@/assets/svg/github1.svg';
import telegram from '@/assets/svg/telegram.svg';

import styles from './RightSide.less';

interface RightSideProps {
  detail: any;
  tocify?: Tocify;
}

const RightSide: React.FC<RightSideProps> = (props) => {
  const { detail, tocify } = props;

  const [aboutart, setAboutart] = useState<any[]>([]);

  const { content, type } = detail;

  useEffect(() => {
    getSameArt(type);
  }, [type]);

  const getSameArt = async (pmrams: any): Promise<any> => {
    const { data } = await getArticleList({
      where: {
        type: pmrams,
      },
    });

    if (data) {
      setAboutart(data.splice(0, 4));
    }
  };

  return (
    <div className={styles.init_aside}>
      <section className={styles.init_section}>
        <aside>
          <div className={styles.teart_one}>
            <h5>关于作者</h5>
            <div className={styles.userInfo}>
              <Avatar
                className={styles.avatar_animate}
                src={require('@/assets/avator.jpeg')}
              />
              <div className={styles.right}>
                <h4>纳兹</h4>
                <h6>全栈 @one peace</h6>
              </div>
            </div>

            <div className={styles.extra_item}>
              <div className={styles.item}>
                <img src={locationSvg} />
                Shanghai
              </div>
              <div className={styles.item}>
                <img src={githubSvg} />
                <a href="https://github.com/starryskystar">@starryskystar</a>
              </div>
              <div className={styles.item}>
                <img src={telegram} />
                @Naze7777
              </div>
            </div>
          </div>
        </aside>

        <aside>
          <div className={`${styles.teart_one} ${styles.tehome_hot}`}>
            <h5>相关文章</h5>
            <ul>
              {aboutart.map((s: any, i: number) => (
                <li
                  onClick={() => {
                    const w: any = window.open('about:blank');
                    w.location.href = `/detail/${s._id}`;
                  }}
                  key={i}
                  title={s.title}
                >
                  {s.title}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <Affix offsetTop={16}>
          <aside className={styles.init_topic}>
            <div className={styles.teart_one}>
              <Skeleton active loading={!content} paragraph={{ rows: 4 }}>
                <h3>目录</h3>
                {tocify?.render()}
              </Skeleton>
            </div>
          </aside>
        </Affix>
      </section>
    </div>
  );
};

export default RightSide;
