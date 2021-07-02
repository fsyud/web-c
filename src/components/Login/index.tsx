import React, { useEffect } from 'react';
import { Modal, Form, Button, Input, ModalProps, notification } from 'antd';
import { registerUser } from '@/service/user';

import styles from './index.less';

interface LoginProps extends ModalProps {}

const Login: React.FC<LoginProps> = (props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (!props.visible) form.resetFields();
  }, [props.visible]);

  const onFinish = async (values: any): Promise<any> => {
    const { data } = await registerUser(values);

    if (data.success) {
      notification.success({
        message: data.msg,
      });
    } else {
      notification.error({
        message: data.msg,
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal
      className={styles.login}
      {...props}
      forceRender
      footer={null}
      width={380}
    >
      <Form
        name="basic"
        form={form}
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: '请输入用户名！' }]}
        >
          <Input placeholder="用户名" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码！' }]}
        >
          <Input.Password placeholder="密码" />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <Button block type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Login;
