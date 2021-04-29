import React from 'react';
import { Row, Col, Skeleton } from 'antd';
import styles from './index.less';

interface TeAwhileProps {
  children: React.ReactNode | React.ReactElement;
}

const TeAwhile: React.FC<TeAwhileProps> = ({ children }) => {
  return (
    <div className={styles.teawhile}>
      <Row>
        <Col span={3} className={styles.teawhile_left}>
          <aside>
            <Skeleton active />
          </aside>
        </Col>
        <Col span={15} className={styles.teawhile_main}>
          <section className={styles.init_section}>{children}</section>
        </Col>
        <Col span={6} className={styles.teawhile_aside}>
          <aside>
            <Skeleton active />
          </aside>
        </Col>
      </Row>
    </div>
  );
};

export default TeAwhile;
