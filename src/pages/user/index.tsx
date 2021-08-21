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
import { userUpdate, getUser } from '@/service/user';

import styles from './index.less';

const User: React.FC<{}> = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [imgurl, setImgurl] = useState<string>(); // base64文件路径
  const [imgPath, setImgPath] = useState<string>(''); // 接口返回文件路径
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async (): Promise<any> => {
    const { data } = await getUser(localStorage.STARRY_STAR_SKY_ID);
    if (data) {
      setImgPath(data.avator_url);
      setImgurl(data.avator_url);
      form.setFieldsValue({
        username: data.username,
        job: data.job,
        company: data.company,
        introduce: data.introduce,
      });
    }
  };

  const getBase64 = (img: any, callback: any) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const onChange = ({ file, fileList, event }: any) => {
    if (file?.response?.code === 0) {
      const { path } = file.response.data;
      getBase64(file.originFileObj, (imageUrl: any) => {
        setLoading(false);
        setImgPath(path);
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

  // 提交
  const onFinish = async (values: any): Promise<any> => {
    console.log(imgPath);
    const userObj = {
      ...values,
      ...{
        avator_url: imgPath,
        id: localStorage.getItem('STARRY_STAR_SKY_ID'),
      },
    };
    const data = await userUpdate(userObj);
    if (data.code === 0) {
      message.success('更新成功！');
      localStorage.setItem(
        'STARRY_STAR_SKY_USER_INFO',
        JSON.stringify(userObj),
      );
      window.location.reload();
    }
  };

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
                    onFinish={onFinish}
                    wrapperCol={{ span: 20 }}
                    form={form}
                    initialValues={{ remember: true }}
                  >
                    <Form.Item label="用户名" name="username">
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
                    <Form.Item label="个人介绍" name="introduce">
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
                        <img src={imgurl} style={{ width: '100%' }} />
                      ) : (
                        uploadButton
                      )}
                    </Upload>
                  </ImgCrop>

                  {imgurl && (
                    <div
                      className={styles.back_upload}
                      onClick={() => setImgurl('')}
                    >
                      撤销上传
                    </div>
                  )}
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
