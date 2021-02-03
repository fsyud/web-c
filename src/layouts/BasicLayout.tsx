import React, { useEffect } from 'react';
import {
  ConfigProvider,
  Layout,
  Menu,
  Breadcrumb,
  Row,
  Col,
  Modal,
  Button,
} from 'antd';
import { Link, Dispatch } from 'umi';
import zh_CN from 'antd/es/locale/zh_CN';
import { Menus } from '@/constant';
import { RibbonsFun } from '@/utils/lib/bg';
import styles from './index.less';

const { Header, Content, Footer } = Layout;

export interface BasicLayoutType {
  dispatch?: Dispatch;
}

const BasicLayout: React.FC<BasicLayoutType> = (props) => {
  const { dispatch, children } = props;
  console.log(dispatch);

  console.log('props');

  useEffect(() => {
    // 引入canvas背景
    RibbonsFun();
  }, []);

  // 定义
  const defaultFooterDom = (
    <Footer className={styles.footer}>
      <Row>
        <Col span={12} offset={6} className={styles.footer_info}>
          ©2020 ｜ 全栈：singlebuck
          <a href="" target="_blank">
            皖ICP备20000463号-1
          </a>
        </Col>
      </Row>
    </Footer>
  );

  const ContentNode = (): React.ReactNode => {
    return (
      <div className={styles.init_page}>
        <ConfigProvider locale={zh_CN}>
          <Layout>
            <Header className={styles.header}>
              <div className="logo" />
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={[`${Menus[0].key}`]}
              >
                {Menus.map(
                  (s: { key: number; label: string; path: string }) => (
                    <Menu.Item key={s.key}>
                      <Link to={s.path}>{s.label}</Link>
                    </Menu.Item>
                  ),
                )}
              </Menu>
            </Header>
            <Content
              className="site-layout"
              style={{ padding: '0 50px', marginTop: 64 }}
            >
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb>
              <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: 380 }}
              >
                {children}
              </div>
            </Content>
            {defaultFooterDom}
          </Layout>
        </ConfigProvider>
      </div>
    );
  };

  return (
    <>
      <div id="myCanvas"></div>
      {ContentNode()}
    </>
  );
};

export default BasicLayout;
