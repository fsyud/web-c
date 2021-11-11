import React from 'react';
import { Card, Avatar } from 'antd';
const { Meta } = Card;

import styles from './index.less';

const Project: React.FC<{}> = () => {
  return (
    <div className={styles.project}>
      <Card hoverable>
        <img src="https://z3.ax1x.com/2021/11/11/I03UzV.jpg" />
        <Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title="博客c端"
          description="This is the description"
        />
      </Card>
      <Card hoverable>
        <img src="https://z3.ax1x.com/2021/11/11/IdXvge.jpg" />
        <Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title="博客后台"
          description="This is the description"
        />
      </Card>
      <Card hoverable>
        <img src="https://z3.ax1x.com/2021/11/11/IdXxjH.jpg" />
        <Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title="博客服务"
          description="This is the description"
        />
      </Card>
    </div>
  );
};

export default Project;
