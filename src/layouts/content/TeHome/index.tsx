import React, { useEffect, useState } from 'react';
import { Row, Col, Affix } from 'antd';
import { history } from 'umi';
import { useMediaQuery } from 'react-responsive';
import { Sparklines, SparklinesBars, SparklinesLine } from 'react-sparklines';
import { getHotArticle } from '@/service/home';
import communicate from '@/assets/svg/communicate.svg';
import questionnaire from '@/assets/svg/questionnaire.svg';
import study from '@/assets/svg/study.svg';
import styles from './index.less';

interface TeHomeProps {
  children: React.ReactNode | React.ReactElement;
}

const TeHome: React.FC<TeHomeProps> = ({ children }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });
  const [hots, setHots] = useState<any[]>([]);

  useEffect(() => {
    getHotArt();
  }, []);

  const getHotArt = async (): Promise<any> => {
    const { data } = await getHotArticle();
    if (data) {
      setHots(data.splice(0, 3));
    }
  };

  const searchHot = (pmrams: any) => {
    const w: any = window.open('about:blank');
    w.location.href = `/detail/${pmrams}`;
  };

  return (
    <div className={styles.tehome}>
      <Row>
        <Col span={18} className={styles.tehome_left}>
          <section className={styles.init_section}>{children}</section>
        </Col>

        {!isTabletOrMobile && (
          <Col span={6} className={styles.init_aside}>
            <aside>
              <div className={styles.tehome_one}>
                <h5>写下你想说的</h5>
                <ul>
                  <li>
                    <div
                      onClick={() => {
                        history.push('/writeArt');
                      }}
                    >
                      <img src={questionnaire} alt="error" />
                    </div>
                    <span>写文章</span>
                  </li>
                  <li>
                    <div
                      onClick={() => {
                        history.push('/awhile');
                      }}
                    >
                      <img src={communicate} alt="error" />
                    </div>
                    <span>发片刻</span>
                  </li>
                  <li>
                    <div
                      onClick={() => {
                        history.push('/book');
                      }}
                    >
                      <img src={study} alt="error" />
                    </div>
                    <span>撰小书</span>
                  </li>
                </ul>
              </div>
            </aside>

            <Affix offsetTop={80}>
              <div className={styles.tehome_fix}>
                <aside className={styles.advertis}>
                  <div className={styles.about_author}>作者</div>
                  <img
                    src={
                      'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/db99263b3641425b96356b04ea6821d0~tplv-k3u1fbpfcp-watermark.image'
                    }
                  />
                </aside>
                <aside>
                  <div className={styles.tehome_one}>
                    <h5>最新片刻</h5>
                    <ul className={styles.tehome_moment}>
                      <li>上班摸鱼</li>
                    </ul>
                  </div>
                </aside>
                <aside>
                  <div className={`${styles.tehome_one} ${styles.tehome_hot}`}>
                    <h5>热门</h5>
                    <ul className={styles.tehome_moment}>
                      {hots.map((s: any, i: number) => (
                        <li
                          onClick={() => {
                            searchHot(s._id);
                          }}
                          key={i}
                        >
                          {s.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                </aside>
                <aside>
                  <p>
                    <a
                      onClick={() => {
                        window.open('http://beian.miit.gov.cn/', '_blank');
                      }}
                    >
                      皖ICP备2021008857号
                    </a>
                  </p>
                  <p>版权所有 © 2021 starryskystar</p>

                  <Sparklines
                    data={[
                      5,
                      10,
                      5,
                      20,
                      8,
                      15,
                      5,
                      10,
                      5,
                      9,
                      10,
                      25,
                      23,
                      11,
                      1,
                      79,
                    ]}
                    limit={20}
                    style={{ height: 30 }}
                  >
                    <SparklinesBars style={{ fill: '#41c3f9' }} />
                    <SparklinesLine
                      style={{ stroke: '#41c3f9', fill: 'none' }}
                    />
                  </Sparklines>
                </aside>
              </div>
            </Affix>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default TeHome;
