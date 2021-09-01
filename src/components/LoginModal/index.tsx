import React, { useEffect, useState, useMemo } from 'react';
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
import { StorageStore } from '@/utils/authority';

import styles from './index.less';

interface LoginModalProps extends ModalProps {
  onSuccessLogin: (params: boolean, type: number) => void;
}

const LoginModal: React.FC<LoginModalProps> = (props) => {
  const { onSuccessLogin, ...otherProps } = props;

  const [form] = Form.useForm();

  const [vis1, setVis1] = useState<boolean>(false);
  const [vis2, setVis2] = useState<boolean>(true);
  const [vis3, setVis3] = useState<boolean>(false);

  const [sumbitAction, setSumbitAction] = useState<boolean>(true);

  useEffect(() => {
    if (!props.visible) {
      form.resetFields();
      setTimeout(() => {
        setSumbitAction(true);
      }, 500);
    }
  }, [props.visible]);

  /**
   * @description: 登录注册
   * @param {any} values
   * @return {*}
   */
  const onFinish = async (values: any): Promise<any> => {
    // 登录状态
    if (sumbitAction) {
      const { data } = await userLogin(values);
      if (data.success) {
        notification.success({
          message: data.msg,
        });
        StorageStore.setAccessToken(data.access_token);
        StorageStore.setUserId(data.id);
        StorageStore.setUserInfoLocalStorage(JSON.stringify(data.user_info));
        onSuccessLogin(true, 1);
      } else {
        notification.error({
          message: data.msg,
        });
        onSuccessLogin(false, 1);
      }
    } else {
      // 注册状态
      const { data } = await registerUser(values);

      if (data.success) {
        notification.success({
          message: '注册成功！赶紧去登录吧！',
        });
        onSuccessLogin(true, 2);
        setSumbitAction(true);
      } else {
        notification.error({
          message: data.msg,
        });
        onSuccessLogin(false, 2);
      }
    }
  };

  useEffect(() => {
    if (!vis1 && !vis3) {
      setVis2(true);
    }
  }, [vis1, vis3]);

  /**
   * @description: 文字状态
   * @param {*} useMemo
   * @return {*}
   */
  const stateTxt = useMemo(() => {
    return sumbitAction ? '登录' : '注册';
  }, [sumbitAction]);

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

  /**
   * @description: 去注册逻辑
   * @param {*}
   * @return {*}
   */
  const goRegister = () => {
    setSumbitAction(false);
  };

  return (
    <Modal
      className={styles.login}
      title={stateTxt}
      forceRender
      destroyOnClose
      footer={null}
      width={318}
      {...otherProps}
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
            {stateTxt}
          </Button>
        </Form.Item>
      </Form>
      <div className={styles.extra_login}>
        <div className={styles.extra_login__head}>
          {sumbitAction && (
            <>
              <Button type="link" onClick={goRegister}>
                还没有账号？去注册
              </Button>
              <Tooltip
                trigger="click"
                title="请联系博主！"
                color={'blue'}
                placement="right"
              >
                <Button className={styles.is_password} type="link">
                  忘记密码
                </Button>
              </Tooltip>
            </>
          )}
          {!sumbitAction && (
            <>
              <Button type="link" onClick={() => setSumbitAction(true)}>
                账号登录
              </Button>
            </>
          )}
        </div>
        {sumbitAction && (
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
        )}
        <div className={styles.warn_info}>
          注册登录即表示同意{' '}
          <a onClick={() => window.open('/protocol', '_blank')}>用户协议</a>、{' '}
          <a>隐私政策</a>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
