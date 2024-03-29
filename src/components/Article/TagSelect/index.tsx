import React, { useState } from 'react';
import classnames from 'classnames';

import { useHistory } from 'umi';
import { Tag } from 'antd';
import styles from './index.less';

interface TagSelectProps {
  list: any[];
  changeTag: (pmrams: number) => void;
}

const TagSelect: React.FC<TagSelectProps> = (props) => {
  const history = useHistory();

  const { list, changeTag } = props;

  const [curIndex, setCurIndex] = useState<number>(100);

  const TagClick = (pm: number): void => {
    setCurIndex(pm);
    changeTag(pm);
  };

  const tagStyle = (pm: number): string => {
    return classnames({
      active: curIndex === pm,
    });
  };

  return (
    <div className={styles.tag_select}>
      {list.map((s: GLOBAL.tagType) => {
        return (
          <Tag
            className={tagStyle(s.type)}
            onClick={() => TagClick(s.type)}
            key={s.type}
          >
            {s.name}
          </Tag>
        );
      })}
      <Tag onClick={() => history.push('/tag-column')}>更多...</Tag>
    </div>
  );
};

export default TagSelect;
