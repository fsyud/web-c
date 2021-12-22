import React, { useState, useEffect } from 'react';
import { Layout, Menu, Row, Col, Button, Dropdown, Input, Avatar } from 'antd';
import { Link, history } from 'umi';
import { DownOutlined } from '@ant-design/icons';
import { Menus } from '@/constant';
import classnames from 'classnames';
import zh_CN from 'antd/es/locale/zh_CN';
import { useMediaQuery } from 'beautiful-react-hooks';
import { StorageStore } from '@/utils/authority';
import LoginModal from '@/components/LoginModal';
import setting from '@/assets/svg/setting.svg';
import ownner from '@/assets/svg/ownner.svg';
import loginouts from '@/assets/svg/loginout.svg';

import styles from './index.less';

const { Header } = Layout;
const { Search } = Input;

interface HeadersProps {
  curLanguages: (value: any) => void;
}

const Headers: React.FC<HeadersProps> = ({ curLanguages }) => {
  const curPath = history.location.pathname;
  const [languages, setLanguages] = useState<any>(zh_CN);
  const [modalVisable, setModalVisable] = useState<boolean>(false);
  const [loginsta, setLoginsta] = useState<boolean>(false);
  const [itemSta, setItemSta] = useState<boolean>(true);
  const [menuKey, setMenuKey] = useState<string>('');
  const [avators, setAvators] = useState<string>('');

  const isTabletOrMobile = useMediaQuery('(min-width: 1024px)');

  // 去除nav样式
  const curActiveKey = (): string => {
    if (
      curPath === '/' ||
      curPath.includes('detail') ||
      curPath.includes('writeArt') ||
      curPath.includes('tag-column') ||
      curPath.includes('user')
    ) {
      return 'clear';
    } else {
      return Menus.find((s: any) => curPath.includes(s.path))?.key || '1';
    }
  };
  const [cur, setCur] = useState<string>(curActiveKey());

  const changeLocale = (e: any) => {
    const localeValue = e.target.value;
    setLanguages(localeValue);
    curLanguages(localeValue);
  };

  const avatorStyle = (): string => {
    return classnames({
      [styles.menu]: true,
      [styles.menu_dis]: itemSta,
    });
  };

  // 重置menu菜单选项
  useEffect(() => {
    setCur(curActiveKey);
  }, [curPath]);

  // 监听是否登录状态
  useEffect(() => {
    if (StorageStore.getUserId() && StorageStore.getUserInfoLocalStorage()) {
      setLoginsta(true);
      setAvators(StorageStore.getUserInfoLocalStorage()?.avatar_url || '');
    }
  });

  useEffect(() => {
    // 菜单全局监听事件
    document.addEventListener('click', (e) => {
      setItemSta(true);
      setMenuKey('');
    });
  }, []);

  // 写文章
  const handleButtonClick = (e: any): void => {
    history.push('/writeArt');
  };

  const handleMenuClick = (e: any): void => {};

  const onSearch = (value: any): void => {
    console.log(value);
  };

  /**
   * @description: 登录成功 回掉函数
   * @param {boolean} params
   * @param {number} type
   * @return {*}
   */
  const onSuccessLogin = (params: boolean, type: number): void => {
    if (params) {
      setModalVisable(false);

      if (type === 1) {
        window.location.reload();
      }
    }
  };

  /**
   * @description: 用户菜单下拉选项
   * @param {object} item
   * @return {*}
   */
  const menuClick = (item: { key: any }): void => {
    const { key } = item;
    setMenuKey(key);

    if (key === 'loginout') {
      const Info = confirm('确定登出么？每片星空下都需要有梦想的人！');
      if (Info) {
        StorageStore.removeAllUserLocal();
        window.location.reload();
      }
    }
    if (key === 'setting') {
      history.push('/user');
    }
  };

  const menu: React.ReactElement = (
    <Menu onClick={handleMenuClick} style={{ width: 103 }}>
      <Menu.Item key="1">去留言</Menu.Item>
    </Menu>
  );

  const menuAvator = (
    <Menu
      onClick={menuClick}
      className={avatorStyle()}
      selectedKeys={[menuKey]}
    >
      <Menu.Item key="setting">
        <img src={setting} />
        设置
      </Menu.Item>
      <Menu.Item key="myhome">
        <img src={ownner} />
        我的主页
      </Menu.Item>
      <Menu.Item key="loginout">
        <img src={loginouts} />
        退出
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className={styles.header}>
      <Row>
        <Col span={10}>
          <Link to={'./'} style={{ color: 'black' }}>
            <div className={styles.logo}>
              <img src={require('@/assets/boal1.png')} alt="error" />
              <strong>星空</strong>
            </div>
          </Link>

          <Menu
            theme="light"
            mode="horizontal"
            className={styles.menu}
            onSelect={(e: any) => setCur(e.key)}
            selectedKeys={[`${cur}`]}
          >
            {Menus.map((s: { key: string; label: string; path: string }) => (
              <Menu.Item key={s.key}>
                <Link to={s.path}>{s.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Col>
        {isTabletOrMobile && (
          <Col span={14} className={styles.header_r__main}>
            <div className={styles.header_right}>
              {!loginsta && (
                <Button
                  className={styles.register}
                  onClick={() => setModalVisable(true)}
                >
                  登录
                </Button>
              )}
              {loginsta && (
                <div className={styles.user_menu}>
                  <div
                    onClick={(e: any) => {
                      setItemSta(false);
                      e.nativeEvent.stopImmediatePropagation();
                    }}
                    className={styles.avtors_img}
                  >
                    <img src={avators} />
                  </div>
                  {menuAvator}
                </div>
              )}
            </div>
            <div className={styles.header_tool}>
              <Search placeholder="探索" onSearch={onSearch} enterButton />
              <Dropdown.Button
                onClick={handleButtonClick}
                overlay={menu}
                icon={<DownOutlined />}
              >
                写文章
              </Dropdown.Button>
              {/* <SelectLang className={styles.action} /> */}
            </div>
          </Col>
        )}
      </Row>
      <LoginModal
        visible={modalVisable}
        onSuccessLogin={onSuccessLogin}
        maskClosable
        closable
        onCancel={() => setModalVisable(false)}
      />
    </Header>
  );
};

export default Headers;
