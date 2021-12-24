import React from 'react';
import { history } from 'umi';
import classnames from 'classnames';
import { useMediaQuery } from 'beautiful-react-hooks';
import { Card, Col, Row } from 'antd';

import { PrimaryButton } from '@/constant/singleEmotion';

import styles from './index.less';

const StarryStarSky: React.FC<{}> = () => {
  const isTabletOrMobile = useMediaQuery('(max-width: 1024px)');

  const oneCard = () => {
    return classnames({
      [styles.one_card]: isTabletOrMobile,
    });
  };

  const mainStyle = () => {
    return classnames({
      [styles.mainStyle]: !isTabletOrMobile,
      [styles.starry]: true,
    });
  };

  return (
    <div className={styles.home_contain}>
      <section className={`${styles.banner_section}`}>
        <div className={styles.banner_element_ship_one}>
          <img
            src={require('@/assets/images/banner/ship1.png')}
            alt="element"
          />
        </div>
        <div className={styles.banner_element_two}>
          <img src={require('@/assets/images/banner/man3.png')} alt="element" />
        </div>
        <div className={styles.banner_element_three}>
          <img src={require('@/assets/images/banner/man2.png')} alt="element" />
        </div>
        <div className={styles.banner_element_seven}>
          <img
            src={require('@/assets/images/banner/ship3.png')}
            alt="element"
          />
        </div>
        <div className={styles.banner_element_eight}>
          <img
            src={require('@/assets/images/banner/line3.png')}
            alt="element"
          />
        </div>
        <div className={styles.banner_element_nigh}>
          <img
            src={require('@/assets/images/banner/line4.png')}
            alt="element"
          />
        </div>
        <div className={styles.banner_element_ten}>
          <img
            src={require('@/assets/images/banner/circle2.png')}
            alt="element"
          />
        </div>

        <div className={mainStyle()}>
          <Row>
            <Col span={24} className={styles.starry_main}>
              <section>
                <div className={styles.introduce}>
                  <h1>
                    The only limit to our realization of tomorrow will be our
                    doubts of today.
                  </h1>

                  <p>实现明天理想的唯一障碍是今天的疑虑</p>
                </div>

                <div className={styles.go}>
                  <PrimaryButton onClick={() => history.push('./home')}>
                    进入博客
                  </PrimaryButton>
                </div>
              </section>
            </Col>

            <Col span={24}>
              <article className={styles.article_style}>
                <div className={styles.desc}>
                  <div>
                    <Row gutter={24}>
                      <Col
                        className={oneCard()}
                        span={isTabletOrMobile ? 24 : 8}
                      >
                        <Card bordered={false}>
                          <h1>网站信息</h1>
                          <p>前端技术：react + emotion</p>
                          <p>后端技术：nestjs + mongodb</p>
                          <p>网站信息：走在低处，也需要仰望星空</p>
                        </Card>
                      </Col>
                      <Col
                        className={oneCard()}
                        span={isTabletOrMobile ? 24 : 8}
                      >
                        <Card bordered={false}>
                          <h1>关于作者</h1>
                          <p>职业：前端</p>
                          <p>爱好：code、篮球、游戏</p>
                          <p></p>
                          <p>擅长：js、css、nodejs、canvas</p>
                        </Card>
                      </Col>
                      <Col
                        className={oneCard()}
                        span={isTabletOrMobile ? 24 : 8}
                      >
                        <Card bordered={false}>
                          <h1>关于未来</h1>

                          <p>目标：财富早日自由</p>
                        </Card>
                      </Col>
                    </Row>
                    <Row gutter={16}></Row>
                  </div>
                </div>
              </article>
            </Col>

            <Col span={24}>
              <footer>
                <div className={styles.foot}>
                  <Row className={styles.contain} gutter={24}>
                    <Col span={isTabletOrMobile ? 24 : 12}>
                      <p className={styles.annotation}>
                        Copyright © 2021 Starry star.
                      </p>
                    </Col>
                    <Col span={isTabletOrMobile ? 24 : 12}>
                      <h3>THE PUBLIC</h3>
                      <img
                        className={styles.code}
                        src={require('@/assets/code.jpg')}
                      />
                    </Col>
                  </Row>
                </div>
              </footer>
            </Col>
          </Row>
        </div>
      </section>
    </div>
  );
};

export default StarryStarSky;
