import React from 'react';
import { ConfigProvider, Layout, Menu, Breadcrumb } from 'antd';
import zh_CN from 'antd/es/locale/zh_CN';
import { Menus } from '@/constant';

const { Header, Content, Footer } = Layout;

const BasicLayout: React.FC<{}> = (props) => {
  console.log(props);

  return (
    <ConfigProvider locale={zh_CN}>
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            {Menus.map((s: { key: number; label: string }) => (
              <Menu.Item key={s.key}>{s.label}</Menu.Item>
            ))}
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
            Content
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
      ,
    </ConfigProvider>
  );
};

export default BasicLayout;
