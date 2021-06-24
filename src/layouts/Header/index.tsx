import React, { useState } from 'react';
import { Layout, Menu, Row, Col, Button } from 'antd';
import { Menus } from '@/constant';
import enUS from 'antd/lib/locale/en_US';
import zh_CN from 'antd/es/locale/zh_CN';
import { Link, SelectLang, history } from 'umi';
import styles from './index.less';

const { Header } = Layout;

interface HeadersProps {
  curLanguages: (value: any) => void;
}

const Headers: React.FC<HeadersProps> = ({ curLanguages }) => {
  const curPath = history.location.pathname;

  const curActiveKey = (): string => {
    if (curPath.includes('artDetail')) {
      return 'clear';
    } else {
      return Menus.find((s: any) => curPath.includes(s.path))?.key || '1';
    }
  };

  const [languages, setLanguages] = useState<any>(enUS);

  const [cur, setCur] = useState<string>(curActiveKey());

  const changeLocale = (e: any) => {
    const localeValue = e.target.value;
    setLanguages(localeValue);
    curLanguages(localeValue);
  };

  const onSelect = (e: any): void => {
    setCur(e.key);
  };

  return (
    <Header className={styles.header}>
      <Row>
        <Col span={16}>
          <div className={styles.logo}>
            <img src={require('@/assets/icon/logo.png')} alt="error" />
          </div>
          <Menu
            theme="light"
            mode="horizontal"
            className={styles.menu}
            onSelect={onSelect}
            defaultSelectedKeys={[`${cur}`]}
          >
            {Menus.map((s: { key: string; label: string; path: string }) => (
              <Menu.Item key={s.key}>
                <Link to={s.path}>{s.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Col>
        <Col span={8}>
          <SelectLang className={styles.action} />
          <div className={styles.header_right}>
            <Button type="link">登录</Button>
            <Button className={styles.register}>注册</Button>
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
    </Header>
  );
};

export default Headers;
