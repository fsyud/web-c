import React, { useState } from 'react';
import { Form, Input, Upload } from 'antd';
import SkyTagRadio from '@/components/SkyForm/SkyTagRadio';
import ImgCrop from 'antd-img-crop';
import styles from './index.less';

const { TextArea } = Input;

type PublishFormProps = {};

const PublishForm: React.FC<PublishFormProps> = (props) => {
  const [form] = Form.useForm();

  const [fileList, setFileList] = useState<any[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url:
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
  };

  const onChange = (fileList: any) => {
    console.log(fileList);
    // setFileList(fileList);
  };

  const onPreview = async (file: any) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow: any = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
    <div className={styles.publish_form}>
      <Form form={form} {...formItemLayout}>
        <SkyTagRadio
          label="分类"
          name="type"
          rules={[{ required: true, message: '清选择标签' }]}
        />
        <Form.Item label="封面图片">
          <ImgCrop rotate>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
            >
              {fileList.length < 5 && '+ Upload'}
            </Upload>
          </ImgCrop>
        </Form.Item>

        <Form.Item label="编辑摘要" name="desc">
          <TextArea />
        </Form.Item>
      </Form>
    </div>
  );
};

export default PublishForm;
