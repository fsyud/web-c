import React, { useEffect } from 'react';
import { Card } from 'antd';
import styles from './index.less';
import { typeDefine } from '@/constant';

const TagColumn: React.FC<{}> = () => {
  return (
    <div className={styles.tag_column}>
      <Card bordered={false}>
        <div className={styles.tag_main}>
          {typeDefine.map((s: GLOBAL.tagType, index: number) => {
            return (
              <div className={styles.tag_one}>
                <h5>{s.name}</h5>
                {s.children && (
                  <ul>
                    {s.children.map((item: any) => {
                      return (
                        <li>
                          {item.icon && <img src={item.icon} />} {item.name}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default TagColumn;
