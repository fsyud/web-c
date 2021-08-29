import React, { useState } from 'react';
import { Input } from 'antd';
import { topicConfList } from '@/constant';
import banSvg from '@/assets/svg/ban.svg';
import styles from './index.less';

interface SkyTopicProps {
  topicClick: (type: string | number) => any;
}

const SkyTopic: React.FC<SkyTopicProps> = (props) => {
  const curList = topicConfList.slice(1, topicConfList.length);
  const [initList, setInitList] = useState<GLOBAL.tagType[]>(curList);
  const [value, setValue] = useState<string>();

  const onSearch = (e: any) => {
    const { value } = e.target;
    setValue(value);
    const mids = curList.filter((s: GLOBAL.tagType) => s.name.includes(value));
    setInitList(mids);
  };

  return (
    <div className={styles.sky_topic}>
      <div className={styles.tragger}></div>
      <div className={styles.top}>
        <Input value={value} placeholder="搜索片刻" onChange={onSearch} />
      </div>
      <div className={styles.content}>
        <h4
          onClick={(e: any) => {
            e.stopPropagation();
            props.topicClick(1000);
          }}
        >
          <img src={banSvg} />
          不参加任何话题
        </h4>
        <ul>
          {initList.map((item: GLOBAL.tagType, index: number) => (
            <li
              key={index}
              onClick={(e: any) => {
                e.stopPropagation();
                props.topicClick(item.type);
              }}
            >
              <img src={item.icon} />
              <div className={styles.txt}>
                <h5>{item.name}</h5>
                <h6>199时刻</h6>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SkyTopic;
