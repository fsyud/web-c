import React, { useState, useEffect } from 'react';
import { getItem } from '@/service/proitem';
import { Card, Avatar } from 'antd';
const { Meta } = Card;

import styles from './index.less';

const Project: React.FC<{}> = () => {
  const [listData, setListData] = useState<any[]>([]);

  useEffect(() => {
    getItemList();
  }, []);

  /**
   * @description: 获取项目列表
   * @param {*} Promise
   * @return {*}
   */
  const getItemList = async (): Promise<any> => {
    const res: any = await getItem({});
    if (res && Array.isArray(res.data)) {
      setListData(res.data);
    }
  };

  return (
    <div className={styles.project}>
      {listData.map((item: API.ItemParms, index: number) => (
        <Card hoverable key={index}>
          <img src={item.img_url} />
          <Meta title={item.title} description={item.desc} />
        </Card>
      ))}
    </div>
  );
};

export default Project;
