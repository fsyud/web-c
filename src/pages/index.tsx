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
    <div className={mainStyle()}>
      <Row>
        <Col span={24} className={styles.starry_main}>
          <section>
            <div className={styles.introduce}>
              <h1>A sentence of the day</h1>
              <p>My working week and my Sunday rest</p>

              <p>我的工作天，我的休息日</p>
            </div>

            <div className={styles.go}>
              <PrimaryButton onClick={() => history.push('./home')}>
                ENTER
              </PrimaryButton>
            </div>
          </section>
        </Col>

        <Col span={24}>
          <article className={styles.article_style}>
            <div className={styles.desc}>
              <div>
                <Row gutter={24}>
                  <Col className={oneCard()} span={isTabletOrMobile ? 24 : 8}>
                    <Card bordered={false}>
                      <h1>About Xingkong</h1>
                      <p>I heard a word when I was very young</p>
                      <p>That's what Bobonnie said</p>
                      <p>
                        We live in the gutter, but some people still look up at
                        the stars
                      </p>
                    </Card>
                  </Col>
                  <Col className={oneCard()} span={isTabletOrMobile ? 24 : 8}>
                    <Card bordered={false}>
                      <h1>About life</h1>
                      <p>I like the open source of computers and codes</p>
                      <p>
                        Currently engaged in full-stack development in a medical
                        company
                      </p>
                      <p>Nice to see you here</p>
                    </Card>
                  </Col>
                  <Col className={oneCard()} span={isTabletOrMobile ? 24 : 8}>
                    <Card bordered={false}>
                      <h1>About the future</h1>

                      <p>Strive to be a freelancer</p>
                      <p>Realize the freedom of wealth as soon as possible</p>
                      <p>To enrich one's own experience</p>
                      <p>Go to Iceland to see the aurora</p>
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
  );
};

export default StarryStarSky;
