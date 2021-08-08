import React, { useState } from 'react';
import { Form, Input, Upload } from 'antd';
import SkyTagRadio from '@/components/SkyForm/SkyTagRadio';
import { typeDefine } from '@/constant';
import ImgCrop from 'antd-img-crop';
import styles from './index.less';

const { TextArea } = Input;

type PublishFormProps = {};

const PublishForm: React.FC<PublishFormProps> = (props) => {
  const [form] = Form.useForm();

  const [fileList, setFileList] = useState<any[]>([]);

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
  };

  const onChange = ({ file, fileList }: any) => {
    console.log(fileList);

    fileList = fileList.map((file: any) => {
      console.log(file);
      if (file.response) {
        console.log(file.response.data.key, 'file.response.data.key');
      }
      return file;
    });

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
          item={typeDefine}
          name="type"
          rules={[{ required: true, message: '清选择标签' }]}
        />
        <Form.Item label="封面图片">
          <ImgCrop rotate>
            <Upload
              action="http://localhost:8000/api/common/upload"
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
