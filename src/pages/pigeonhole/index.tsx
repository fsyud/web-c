import React, { useEffect, useState } from 'react';
import { Timeline } from 'antd';
import { createSuperLabel } from '@/utils/utils';
import moment from 'moment';
import { ClockCircleOutlined } from '@ant-design/icons';
import { getPigeonholeArticle } from '@/service/home';

import styles from './index.less';

const Pigeonhole: React.FC<{}> = () => {
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = async (): Promise<any> => {
    const res = await getPigeonholeArticle();
    setList(res?.data || []);
  };

  return (
    <div className={styles.pig_hole}>
      <Timeline mode="alternate">
        {list.length > 0 &&
          list.map((item: any) => {
            return (
              <Timeline.Item
                label={moment(item?.create_times).format('YYYY-M-D')}
              >
                <a
                  onClick={() =>
                    createSuperLabel(`/detail/${item._id}`, 'pigon_list_click')
                  }
                >
                  {item.title}
                </a>
              </Timeline.Item>
            );
          })}
      </Timeline>
    </div>
  );
};

export default Pigeonhole;
