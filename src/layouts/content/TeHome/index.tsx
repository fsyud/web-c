import React from 'react';
import { Row, Col, Skeleton } from 'antd';
import styles from './index.less';

interface TeHomeProps {
  children: React.ReactNode | React.ReactElement;
}

const TeHome: React.FC<TeHomeProps> = ({ children }) => {
  return (
    <div className={styles.tehome}>
      <Row>
        <Col span={18} className={styles.tehome_left}>
          <section className={styles.init_section}>{children}</section>
        </Col>
        <Col span={6} className={styles.init_aside}>
          <aside>
            <Skeleton />
          </aside>
        </Col>
      </Row>
    </div>
  );
};

export default TeHome;
