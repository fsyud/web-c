import React, { useState } from 'react';
import classnames from 'classnames';
import { Tag } from 'antd';
import styles from './index.less';

interface TagSelectProps {
  list: any[];
}

const TagSelect: React.FC<TagSelectProps> = (props) => {
  const { list } = props;

  const [curIndex, setCurIndex] = useState<number>();

  const TagClick = (pm: number): void => {
    setCurIndex(pm);
  };

  const tagStyle = (pm: number): string => {
    return classnames({
      active: curIndex === pm,
    });
  };

  return (
    <div className={styles.tag_select}>
      {list.map((s: any, index: number) => {
        return (
          <Tag
            className={tagStyle(index)}
            onClick={() => TagClick(index)}
            key={index}
          >
            测试测试
          </Tag>
        );
      })}
      <Tag>更多...</Tag>
    </div>
  );
};

export default TagSelect;
