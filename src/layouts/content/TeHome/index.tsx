import React, { useEffect, useState } from 'react';
import { Row, Col, Affix, Tooltip } from 'antd';
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
            <aside className={styles.side_one}>
              <div>
                <h5>你的创作</h5>
                <ul>
                  <li
                    onClick={() => {
                      history.push('/writeArt');
                    }}
                  >
                    <div>
                      <Tooltip placement="bottom" title="写文章">
                        <img src={questionnaire} alt="error" />
                      </Tooltip>
                    </div>
                  </li>
                  <li
                    onClick={() => {
                      history.push('/awhile');
                    }}
                  >
                    <div>
                      <Tooltip placement="bottom" title="去留言">
                        <img src={communicate} alt="error" />
                      </Tooltip>
                    </div>
                  </li>
                </ul>
              </div>
            </aside>

            <Affix offsetTop={57}>
              <div>
                <aside className={styles.side_two}>
                  <div>
                    <h5>最新留言</h5>
                    <ul>
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
                <aside className={styles.side_three}>
                  <div>
                    <h5>热门文章</h5>
                    <ul>
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
                <aside className={styles.side_four}>
                  <p>
                    <a
                      onClick={() => {
                        window.open('http://beian.miit.gov.cn/', '_blank');
                      }}
                    >
                      皖ICP备2021008857号
                    </a>
                  </p>
                  <p>版权所有 © 2022 starryskystar</p>
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
