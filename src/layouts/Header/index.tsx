import React, { useState, useEffect } from 'react';
import { Layout, Menu, Row, Col, Button, Dropdown, Input, Avatar } from 'antd';
import { Menus } from '@/constant';
// import enUS from 'antd/lib/locale/en_US';
import zh_CN from 'antd/es/locale/zh_CN';
import { Link, SelectLang, history } from 'umi';
import { DownOutlined } from '@ant-design/icons';
import LoginModal from '@/components/LoginModal';

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

  // 去除nav样式
  const curActiveKey = (): string => {
    if (
      curPath.includes('detail') ||
      curPath.includes('writeArt') ||
      curPath.includes('tag-column')
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

  useEffect(() => {
    setCur(curActiveKey);
  }, [curPath]);

  useEffect(() => {
    if (localStorage.STARRY_STAR_SKY) {
      setLoginsta(true);
    }
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
      window.location.reload();
    }
  };

  const menu: React.ReactElement = (
    <Menu onClick={handleMenuClick} style={{ width: 103 }}>
      <Menu.Item key="1">发片刻</Menu.Item>
      <Menu.Item key="2">写小书</Menu.Item>
    </Menu>
  );

  const menuAvator = (
    <Menu>
      <Menu.Item>设置</Menu.Item>
      <Menu.Item>我的主页</Menu.Item>
      <Menu.Item
        onClick={() => {
          localStorage.removeItem('STARRY_STAR_SKY');
          window.location.reload();
        }}
      >
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
              <Dropdown
                overlay={menuAvator}
                placement="bottomLeft"
                trigger={['click']}
                overlayStyle={{
                  width: 110,
                  borderRadius: 4,
                }}
              >
                <Avatar src={require('@/assets/avator.jpeg')} />
              </Dropdown>
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
