import React from 'react';
import { Row, Col, Skeleton, Radio, Space } from 'antd';
import { useMediaQuery } from 'beautiful-react-hooks';
import { topicConfList } from '@/constant';
import styles from './index.less';

interface TeAwhileProps {
  children: React.ReactNode | React.ReactElement;
}

const TeAwhile: React.FC<TeAwhileProps> = ({ children }) => {
  const isTabletOrMobile = useMediaQuery('(max-width: 1024px)');

  return (
    <div className={styles.teawhile}>
      <Row>
        {!isTabletOrMobile && (
          <Col span={3} className={styles.teawhile_left}>
            <aside>
              <Skeleton active loading={false}>
                <Space direction="vertical">
                  <Radio.Group defaultValue={999} buttonStyle="solid">
                    {[
                      ...topicConfList.slice(0, 9),
                      ...[{ type: 1000, name: '更多片刻 +' }],
                    ].map((s: GLOBAL.tagType, index: number) => (
                      <Radio.Button key={index} value={s.type}>
                        {s.name}
                      </Radio.Button>
                    ))}
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
