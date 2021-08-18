import React from 'react';
import { Form, Radio } from 'antd';
import { FormItemProps } from 'antd/lib/form';

import styles from './index.less';

interface SkyTagRadioProps extends FormItemProps {
  item: GLOBAL.tagType[];
}

const SkyTagRadio: React.FC<SkyTagRadioProps> = (props) => {
  const { item, ...otherProps } = props;

  return (
    <div className={styles.sky_tag__radio}>
      <Form.Item {...otherProps}>
        <Radio.Group optionType="button" buttonStyle="solid">
          {item.map((s: GLOBAL.tagType) => (
            <Radio.Button key={s.type} value={s.type}>
              {s.name}
            </Radio.Button>
          ))}
        </Radio.Group>
      </Form.Item>
    </div>
  );
};

export default SkyTagRadio;
