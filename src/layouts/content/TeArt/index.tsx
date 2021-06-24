import React from 'react';
import styles from './index.less';
import { Row, Col } from 'antd';

interface TeArtProps {
  children: React.ReactNode | React.ReactElement;
}

const TeArt: React.FC<TeArtProps> = ({ children }) => {
  return (
    <div className={styles.teart}>
      <Row>
        <Col span={18} className={styles.teart_left}>
          <section className={styles.init_section}>{children}</section>
        </Col>
        <Col span={6} className={styles.init_aside}>
          <aside>
            <div className={styles.teart_one}>
              <h5>相关推荐</h5>
            </div>
          </aside>
        </Col>
      </Row>
    </div>
  );
};

export default TeArt;
