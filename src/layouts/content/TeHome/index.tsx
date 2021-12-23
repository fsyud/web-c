import React, { useEffect, useState } from 'react';
import { Row, Col, Affix } from 'antd';
import classnames from 'classnames';
import { history } from 'umi';
import { useMediaQuery } from 'beautiful-react-hooks';
import { getHotArticle } from '@/service/home';
import { getAwhileList } from '@/service/awhile';
import communicate from '@/assets/svg/communicate.svg';
import questionnaire from '@/assets/svg/questionnaire.svg';
import comnumber from '@/assets/svg/comnumber.svg';
import styles from './index.less';

interface TeHomeProps {
  children: React.ReactNode | React.ReactElement;
}

const TeHome: React.FC<TeHomeProps> = ({ children }) => {
  const isTabletOrMobile = useMediaQuery('(max-width: 1024px)');
  const [hots, setHots] = useState<any[]>([]);
  const [whiles, setWhiles] = useState<any[]>([]);
  const [qrcode, setQrcode] = useState<boolean>(false);

  useEffect(() => {
    getHotArt();
    getWhile();
  }, []);

  const getHotArt = async (): Promise<any> => {
    const { data } = await getHotArticle();
    if (data) {
      setHots(data);
    }
  };

  const getWhile = async (): Promise<any> => {
    const { data } = await getAwhileList({
      page: 1,
      pageSize: 4,
      tag: 999,
      state: 2,
    });
    if (data) {
      setWhiles(data);
    }
  };

  const searchHot = (pmrams: any) => {
    const w: any = window.open('about:blank');
    w.location.href = `/detail/${pmrams}`;
  };

  const commitStyle = (): string => {
    return classnames({
      [styles.tehome]: true,
      [styles.tehome_isMobobile]: isTabletOrMobile,
    });
  };

  return (
    <div className={commitStyle()}>
      <Row>
        <Col span={isTabletOrMobile ? 24 : 18} className={styles.tehome_left}>
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
                    <span>去留言</span>
                  </li>
                </ul>
              </div>
            </aside>

            <Affix offsetTop={57}>
              <div className={styles.tehome_fix}>
                {/* <aside className={styles.advertis}>
                  <div className={styles.about_author}>广告</div>
                  <img src={'https://s4.ax1x.com/2021/12/16/T96Gm4.jpg'} />
                </aside> */}
                <aside>
                  <div className={`${styles.tehome_one} ${styles.tehome_hot}`}>
                    <h5>最新沸点</h5>
                    <ul className={styles.tehome_moment}>
                      {whiles.map((s: any, i: number) => (
                        <li
                          onClick={() => {
                            history.push('/awhile');
                          }}
                          key={i}
                          title={s.title}
                        >
                          {s?.oneWhile?.content}
                        </li>
                      ))}
                    </ul>
                  </div>
                </aside>
                <aside>
                  <div className={`${styles.tehome_one} ${styles.tehome_hot}`}>
                    <h5>热门文章</h5>
                    <ul className={styles.tehome_moment}>
                      {hots.map((s: any, i: number) => (
                        <li
                          onClick={() => {
                            searchHot(s._id);
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
                  <h6 className={styles.wechat}>
                    <img
                      src={comnumber}
                      onMouseEnter={() => setQrcode(true)}
                      onMouseOut={() => setQrcode(false)}
                    />

                    {qrcode && (
                      <div className={styles.qrcode}>
                        <h4>公众号</h4>
                        <img src={require('@/assets/code.jpg')} />
                      </div>
                    )}
                  </h6>
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
