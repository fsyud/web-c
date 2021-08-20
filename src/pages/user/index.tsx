import React, { useState, useEffect } from 'react';
import { useHistory } from 'umi';
import {
  PageHeader,
  Row,
  Col,
  Space,
  Radio,
  Card,
  Form,
  Upload,
  message,
  Button,
  Input,
  Divider,
} from 'antd';
import ImgCrop from 'antd-img-crop';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import styles from './index.less';

const User: React.FC<{}> = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [imgurl, setImgurl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const getBase64 = (img: any, callback: any) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const onChange = ({ file, fileList, event }: any) => {
    console.log(file);
    if (file.status === 'done') {
      getBase64(file.originFileObj, (imageUrl: any) => {
        setLoading(false);
        setImgurl(imageUrl);
      });
    }
  };

  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('请上传 JPG/PNG 格式的文件!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片请小于1MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传头像</div>
    </div>
  );

  return (
    <div className={styles.user_bar}>
      <PageHeader
        className={styles.header}
        onBack={() => history.push('/home')}
        title="返回"
        subTitle="返回首页"
        ghost={false}
      />

      <div className={styles.main}>
        <Row>
          <Col span={6}>
            <aside className={styles.a_side}>
              <Space direction="vertical">
                <Radio.Group defaultValue="a" buttonStyle="solid">
                  <Radio.Button value="a">个人资料</Radio.Button>
                  <Radio.Button value="b">账号设置</Radio.Button>
                </Radio.Group>
              </Space>
            </aside>
          </Col>
          <Col span={18}>
            <div className={styles.a_right}>
              <Card title="个人资料">
                <div className={styles.left}>
                  <Form
                    name="basic"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 20 }}
                    form={form}
                    initialValues={{ remember: true }}
                  >
                    <Form.Item label="用户名" name="name">
                      <Input placeholder="填写你的用户名" />
                    </Form.Item>
                    <Divider />
                    <Form.Item label="职位" name="job">
                      <Input placeholder="填写你的职位" />
                    </Form.Item>
                    <Divider />
                    <Form.Item label="公司" name="company">
                      <Input placeholder="填写你的公司" />
                    </Form.Item>
                    <Divider />
                    <Form.Item label="个人介绍" name="user_info">
                      <Input.TextArea
                        placeholder="填写职业技能、擅长的事情、喜欢的事情等"
                        allowClear
                        autoSize={{ minRows: 3, maxRows: 6 }}
                      />
                    </Form.Item>
                    <Divider />
                    <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                      <Button type="primary" htmlType="submit">
                        保存修改
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
                <div className={styles.right}>
                  <ImgCrop
                    rotate
                    aspect={1 / 1}
                    modalTitle="裁剪图片，建议上传1/1比例的图片"
                  >
                    <Upload
                      action="/api/common/upload"
                      listType="picture-card"
                      showUploadList={false}
                      onChange={onChange}
                      beforeUpload={beforeUpload}
                    >
                      {imgurl ? (
                        <img
                          src={imgurl}
                          alt="avatar"
                          style={{ width: '100%' }}
                        />
                      ) : (
                        uploadButton
                      )}
                    </Upload>
                  </ImgCrop>
                  <div
                    className={styles.back_upload}
                    onClick={() => setImgurl('')}
                  >
                    撤销上传
                  </div>
                </div>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default User;
