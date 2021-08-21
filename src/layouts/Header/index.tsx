import React, { useState, useEffect } from 'react';
import { Layout, Menu, Row, Col, Button, Dropdown, Input, Avatar } from 'antd';
import { Link, SelectLang, history } from 'umi';
import { DownOutlined } from '@ant-design/icons';
import { Menus } from '@/constant';
import classnames from 'classnames';
import { getUser } from '@/service/user';
// import enUS from 'antd/lib/locale/en_US';
import zh_CN from 'antd/es/locale/zh_CN';
import { useMediaQuery } from 'beautiful-react-hooks';
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
    if (
      localStorage.STARRY_STAR_SKY &&
      localStorage.STARRY_STAR_SKY_USER_INFO
    ) {
      setLoginsta(true);
      const data = JSON.parse(localStorage.STARRY_STAR_SKY_USER_INFO);
      setAvators(data?.avator_url || '');
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

  // 登录成功
  const onSuccessLogin = (params: boolean): void => {
    if (params) {
      setModalVisable(false);
      getUserInfo();
      // window.location.reload();
    }
  };

  const getUserInfo = async (): Promise<any> => {
    const { data } = await getUser(localStorage.STARRY_STAR_SKY_ID);

    if (data) {
      localStorage.setItem('STARRY_STAR_SKY_USER_INFO', JSON.stringify(data));
    }
  };

  // 下拉菜单点击
  const menuClick = (item: { key: any }): void => {
    const { key } = item;
    setMenuKey(key);

    if (key === 'loginout') {
      localStorage.removeItem('STARRY_STAR_SKY');
      localStorage.removeItem('STARRY_STAR_SKY_ID');
      window.location.reload();
    }
    if (key === 'setting') {
      history.push('/user');
    }
  };

  const menu: React.ReactElement = (
    <Menu onClick={handleMenuClick} style={{ width: 103 }}>
      <Menu.Item key="1">发片刻</Menu.Item>
      <Menu.Item key="2">写小书</Menu.Item>
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
          <Link to={Menus[0].path} style={{ color: 'black' }}>
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
              {/* <Button type="link">注册</Button> */}
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
                  >
                    <Avatar src={avators} />
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
              <SelectLang className={styles.action} />
            </div>

            {/* <Radio.Group size="small" value={languages} onChange={changeLocale}>
            <Radio.Button key="en" value={enUS}>
              English
            </Radio.Button>
            <Radio.Button key="cn" value={zh_CN}>
              中文
            </Radio.Button>
          </Radio.Group> */}
          </Col>
        )}
      </Row>
      <LoginModal
        visible={modalVisable}
        onSuccessLogin={onSuccessLogin}
        maskClosable
        closable
        title="登录"
        onCancel={() => setModalVisable(false)}
      />
    </Header>
  );
};

export default Headers;
