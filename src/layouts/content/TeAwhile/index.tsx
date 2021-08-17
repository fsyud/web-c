import React from 'react';
import { Row, Col, Skeleton, Radio, Space } from 'antd';
import { useMediaQuery } from 'react-responsive';
import styles from './index.less';

interface TeAwhileProps {
  children: React.ReactNode | React.ReactElement;
}

const TeAwhile: React.FC<TeAwhileProps> = ({ children }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });

  return (
    <div className={styles.teawhile}>
      <Row>
        {!isTabletOrMobile && (
          <Col span={3} className={styles.teawhile_left}>
            <aside>
              <Skeleton active loading={false}>
                <Space direction="vertical">
                  <Radio.Group defaultValue="a" buttonStyle="solid">
                    <Radio.Button value="a">推荐</Radio.Button>
                    <Radio.Button value="b">热门</Radio.Button>
                    <Radio.Button value="c">上班摸鱼</Radio.Button>
                    <Radio.Button value="d">其他</Radio.Button>
                  </Radio.Group>
                </Space>
              </Skeleton>
            </aside>
          </Col>
        )}

        <Col span={isTabletOrMobile ? 24 : 15} className={styles.teawhile_main}>
          <section className={styles.init_section}>
            <Skeleton active loading={false}>
              {children}
            </Skeleton>
          </section>
        </Col>

        {!isTabletOrMobile && (
          <Col span={6} className={styles.teawhile_aside}>
            <aside>
              <Skeleton active loading={false}>
                <div className={styles.tehome_one}>
                  <h5>推荐片刻</h5>
                  <ul className={styles.tehome_moment}>
                    <li>上班摸鱼</li>
                  </ul>
                </div>
              </Skeleton>
            </aside>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default TeAwhile;
