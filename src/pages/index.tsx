import React from 'react';
import { history } from 'umi';
import { Card, Col, Row } from 'antd';

import { PrimaryButton } from '@/constant/singleEmotion';

import styles from './index.less';

const StarryStarSky: React.FC<{}> = () => {
  return (
    <div className={styles.starry}>
      <section>
        <div className={styles.introduce}>
          <h1>A sentence of the day</h1>
          <p>My working week and my Sunday rest</p>

          <p>我的工作天，我的休息日</p>
        </div>

        <div className={styles.go}>
          <PrimaryButton onClick={() => history.push('./home')}>
            进入博客
          </PrimaryButton>
        </div>
      </section>

      <article>
        <div className={styles.desc}>
          <div>
            <Row gutter={16}>
              <Col span={8}>
                <Card bordered={false}>
                  <h1>About Xingkong</h1>
                  <p>I heard a word when I was very young</p>
                  <p>That's what Bobonnie said</p>
                  <p>
                    We live in the gutter, but some people still look up at the
                    stars
                  </p>
                </Card>
              </Col>
              <Col span={8}>
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
              <Col span={8}>
                <Card bordered={false}>
                  <h1>About the future</h1>

                  <p>Strive to be a freelancer</p>
                  <p>Realize the freedom of wealth as soon as possible</p>
                  <p>To enrich one's own experience</p>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </article>

      <footer>
        <div className={styles.foot}>
          <Row className={styles.contain} gutter={16}>
            <Col span={8}>
              <p className={styles.annotation}>
                Copyright © 2021 Facebook Inc.
              </p>
            </Col>
            <Col span={8}>
              <h3>THE PUBLIC</h3>
              <img className={styles.code} src={require('@/assets/code.jpg')} />
            </Col>
          </Row>
        </div>
      </footer>
    </div>
  );
};

export default StarryStarSky;
