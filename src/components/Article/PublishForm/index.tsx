import React, { useState } from 'react';
import { Form, Input, Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import SkyTagRadio from '@/components/SKy/SkyForm/SkyTagRadio';
import { FormInstance } from 'antd/lib/form';
import { typeDefine } from '@/constant';
import ImgCrop from 'antd-img-crop';
import styles from './index.less';

const { TextArea } = Input;

type PublishFormProps = {
  form: FormInstance;
  handleUploadImg: (params: any) => void;
};

const PublishForm: React.FC<PublishFormProps> = (props) => {
  const { form, handleUploadImg } = props;

  const [imgurl, setImgurl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
  };

  const getBase64 = (img: any, callback: any) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const onChange = ({ file, fileList, event }: any) => {
    // console.log(file);
    if (file.status === 'done') {
      getBase64(file.originFileObj, (imageUrl: any) => {
        setLoading(false);
        setImgurl(imageUrl);
        handleUploadImg(imageUrl);
      });
    }
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

  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('请上传 JPG/PNG 格式的文件!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片请小于2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传文章封面</div>
    </div>
  );

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
          <ImgCrop
            rotate
            aspect={3 / 2}
            modalTitle="裁剪图片，建议上传3/2比例的图片"
          >
            <Upload
              action="/api/common/upload"
              listType="picture-card"
              showUploadList={false}
              onChange={onChange}
              onPreview={onPreview}
              beforeUpload={beforeUpload}
            >
              {imgurl ? (
                <img src={imgurl} alt="avatar" style={{ width: '100%' }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </ImgCrop>
        </Form.Item>

        <Form.Item
          label="编辑摘要"
          name="desc"
          rules={[{ required: true, message: '请编辑摘要！' }]}
        >
          <TextArea />
        </Form.Item>
      </Form>
    </div>
  );
};

export default PublishForm;
