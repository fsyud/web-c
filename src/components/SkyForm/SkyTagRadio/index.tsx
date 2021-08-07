import React from 'react';
import { Form, Radio } from 'antd';
import { FormItemProps } from 'antd/lib/form';

import styles from './index.less';

interface SkyTagRadioProps extends FormItemProps {}

const SkyTagRadio: React.FC<SkyTagRadioProps> = (props) => {
  const { ...otherProps } = props;

  return (
    <div className={styles.sky_tag__radio}>
      <Form.Item {...otherProps}>
        <Radio.Group optionType="button" buttonStyle="solid">
          <Radio.Button value="a">item 1</Radio.Button>
          <Radio.Button value="b">item 2</Radio.Button>
          <Radio.Button value="c">item 3</Radio.Button>
        </Radio.Group>
      </Form.Item>
    </div>
  );
};

export default SkyTagRadio;
