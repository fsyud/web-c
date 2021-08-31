import React, { useEffect, useState } from 'react';
import Tocify from '@/components/Article/MarkdownBody/tocify';
import { Skeleton, Affix, Avatar } from 'antd';
import { GithubStringSlice } from '@/utils/utils';
import { getArticleList } from '@/service/home';
// import locationSvg from '@/assets/svg/location.svg';
import githubSvg from '@/assets/svg/github1.svg';
// import telegram from '@/assets/svg/telegram.svg';
import { UserOutlined } from '@ant-design/icons';

import styles from './RightSide.less';

interface RightSideProps {
  detail: any;
  tocify?: Tocify;
}

const RightSide: React.FC<RightSideProps> = (props) => {
  const { detail, tocify } = props;

  const [aboutart, setAboutart] = useState<any[]>([]);

  const { content, type, author_user_info } = detail;

  useEffect(() => {
    if (type) {
      getSameArt(type);
    }
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
              {author_user_info?.avatar_url ? (
                <img
                  className={styles.avatar_animate}
                  src={author_user_info.avatar_url}
                />
              ) : (
                <Avatar
                  className={styles.avatar_animate}
                  icon={<UserOutlined />}
                />
              )}

              <div className={styles.right}>
                <h4>{author_user_info?.username}</h4>
                <h6>
                  {author_user_info?.job} @{author_user_info?.company}
                </h6>
              </div>
            </div>

            <div className={styles.extra_item}>
              {/* <div className={styles.item}>
                <img src={locationSvg} />
                Shanghai
              </div> */}
              {/* <div className={styles.item}>
                <img src={telegram} />
                @Naze7777
              </div> */}
              {author_user_info?.author_web && (
                <div className={styles.item}>
                  <img src={githubSvg} />
                  <a
                    title={author_user_info.author_we}
                    href={author_user_info.author_web}
                  >
                    {GithubStringSlice(author_user_info.author_web)}
                  </a>
                </div>
              )}
            </div>
          </div>
        </aside>

        <aside>
          <div className={`${styles.teart_one} ${styles.tehome_hot}`}>
            <Skeleton
              active
              loading={aboutart && aboutart.length === 0}
              paragraph={{ rows: 1 }}
            >
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
            </Skeleton>
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
