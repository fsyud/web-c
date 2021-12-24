import React, { useEffect, useState } from 'react';
import { Timeline } from 'antd';
import { useDispatch } from 'umi';
import { useWindowScroll } from 'beautiful-react-hooks';
import { createSuperLabel } from '@/utils/utils';
import { Mutual } from '@/utils/mutual';
import moment from 'moment';
import { ClockCircleOutlined } from '@ant-design/icons';
import { getPigeonholeArticle } from '@/service/home';

import styles from './index.less';

const Pigeonhole: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    getList();
  }, []);

  useWindowScroll(Mutual.affixMenuScroller(dispatch));

  const getList = async (): Promise<any> => {
    const res = await getPigeonholeArticle();
    setList(res?.data || []);
  };

  return (
    <div className={styles.pig_hole}>
      <Timeline mode="alternate">
        {list.length > 0 &&
          list.map((item: any, index: number) => {
            return (
              <div key={index}>
                <Timeline.Item
                  dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}
                >
                  {moment(item?.create_times).format('YYYY-M-D')}
                </Timeline.Item>
                <Timeline.Item>
                  <a
                    onClick={() =>
                      createSuperLabel(
                        `/detail/${item._id}`,
                        'pigon_list_click',
                      )
                    }
                  >
                    {item.title}
                  </a>
                </Timeline.Item>
              </div>
            );
          })}
      </Timeline>
    </div>
  );
};

export default Pigeonhole;
