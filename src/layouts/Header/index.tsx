import React, { useState, useEffect } from 'react';
import { Layout, Menu, Row, Col, Button, Dropdown, message, Input } from 'antd';
import { Menus } from '@/constant';
import enUS from 'antd/lib/locale/en_US';
// import zh_CN from 'antd/es/locale/zh_CN';
import { Link, SelectLang, history } from 'umi';
import { DownOutlined } from '@ant-design/icons';
import Login from '@/components/Login';

import styles from './index.less';

const { Header } = Layout;
const { Search } = Input;

interface HeadersProps {
  curLanguages: (value: any) => void;
}

const Headers: React.FC<HeadersProps> = ({ curLanguages }) => {
  const curPath = history.location.pathname;
  const [languages, setLanguages] = useState<any>(enUS);

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
  const [modalVisable, setModalVisable] = useState<boolean>(false);

  const changeLocale = (e: any) => {
    const localeValue = e.target.value;
    setLanguages(localeValue);
    curLanguages(localeValue);
  };

  useEffect(() => {
    setCur(curActiveKey);
  }, [curPath]);

  const onSelect = (e: any): void => {
    setCur(e.key);
  };

  const handleButtonClick = (e: any): void => {
    history.push('/writeArt');
  };

  const handleMenuClick = (e: any): void => {};

  const onSearch = (value: any): void => {
    console.log(value);
  };

  const menu: React.ReactElement = (
    <Menu onClick={handleMenuClick} style={{ width: 103 }}>
      <Menu.Item key="1">发片刻</Menu.Item>
      <Menu.Item key="2">写小书</Menu.Item>
    </Menu>
  );

  return (
    <Header className={styles.header}>
      <Row>
        <Col span={10}>
          <Link to={Menus[0].path} style={{ color: 'black' }}>
            <div className={styles.logo}>
              <img src={require('@/assets/icon/pencil.png')} alt="error" />
              <strong>星空</strong>
            </div>
          </Link>

          <Menu
            theme="light"
            mode="horizontal"
            className={styles.menu}
            onSelect={onSelect}
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
            <Button
              className={styles.register}
              onClick={() => setModalVisable(true)}
            >
              登录
            </Button>
          </div>
          <div className={styles.header_tool}>
            <Search placeholder="探索" onSearch={onSearch} enterButton />
            <Dropdown.Button
              onClick={handleButtonClick}
              overlay={menu}
              icon={<DownOutlined />}
              trigger={['click']}
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
      <Login
        visible={modalVisable}
        maskClosable
        closable
        title="登录"
        onCancel={() => setModalVisable(false)}
      />
    </Header>
  );
};

export default Headers;
