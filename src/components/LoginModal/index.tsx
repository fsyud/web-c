import React, { useEffect, useState } from 'react';
import {
  Modal,
  Form,
  Button,
  Input,
  ModalProps,
  notification,
  Tooltip,
} from 'antd';
import good1 from '@/assets/svg/good_1.svg';
import good2 from '@/assets/svg/good_2.svg';
import good3 from '@/assets/svg/good_3.svg';
import GitHub from '@/assets/svg/GitHub.svg';
import wechat from '@/assets/svg/wechat.svg';
import { registerUser, userLogin } from '@/service/user';

import styles from './index.less';

interface LoginModalProps extends ModalProps {}

const LoginModal: React.FC<LoginModalProps> = (props) => {
  const { ...otherProps } = props;

  const [form] = Form.useForm();

  const [vis1, setVis1] = useState<boolean>(false);
  const [vis2, setVis2] = useState<boolean>(true);
  const [vis3, setVis3] = useState<boolean>(false);

  useEffect(() => {
    if (!props.visible) form.resetFields();
  }, [props.visible]);

  const onFinish = async (values: any): Promise<any> => {
    const { data } = await userLogin(values);

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

  useEffect(() => {
    if (!vis1 && !vis3) {
      setVis2(true);
    }
  }, [vis1, vis3]);

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  // 获取焦点
  const onFocus1 = () => {
    setVis1(true);
    setVis2(false);
    setVis3(false);
  };

  const onFocus2 = () => {
    setVis3(true);
    setVis1(false);
    setVis2(false);
  };

  return (
    <Modal
      className={styles.login}
      {...otherProps}
      forceRender
      footer={null}
      centered
      width={380}
    >
      <div className={styles.extra_photo}>
        {vis1 && (
          <div className={`${styles.pto} ${styles.pto_one}`}>
            <img src={good1} alt="error" />
          </div>
        )}
        {vis2 && (
          <div className={`${styles.pto} ${styles.pto_two}`}>
            <img src={good2} alt="error" />
          </div>
        )}
        {vis3 && (
          <div className={`${styles.pto} ${styles.pto_three}`}>
            <img src={good3} alt="error" />
          </div>
        )}
      </div>
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
          <Input
            placeholder="用户名"
            onFocus={onFocus1}
            onBlur={() => {
              setVis1(false);
            }}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码！' }]}
        >
          <Input.Password
            placeholder="密码"
            onFocus={onFocus2}
            onBlur={() => {
              setVis3(false);
            }}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <Button block type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
      <div className={styles.extra_login}>
        <div className={styles.extra_login__head}>
          <Tooltip title="请联系博主！" color={'blue'} placement="right">
            <Button type="link">忘记密码</Button>
          </Tooltip>
        </div>
        <ul>
          <li>
            <div>
              <img src={GitHub} alt="github" />
            </div>
          </li>
          <li>
            <div>
              <img src={wechat} alt="github" />
            </div>
          </li>
        </ul>
      </div>
    </Modal>
  );
};

export default LoginModal;
