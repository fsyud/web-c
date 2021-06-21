import React from 'react';
import { Row, Col, Skeleton } from 'antd';
import {
  HighlightOutlined,
  MessageOutlined,
  ReadOutlined,
} from '@ant-design/icons';
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
            <div className={styles.tehome_one}>
              <h5>写下你想说的</h5>
              <ul>
                <li>
                  <HighlightOutlined />
                  <span>写文章</span>
                </li>
                <li>
                  <MessageOutlined />
                  <span>发片刻</span>
                </li>
                <li>
                  <ReadOutlined />
                  <span>写文章</span>
                </li>
              </ul>
            </div>
            <Skeleton />
          </aside>
          <aside>
            <Skeleton />
          </aside>
        </Col>
      </Row>
    </div>
  );
};

export default TeHome;
