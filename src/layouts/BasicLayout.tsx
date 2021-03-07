import React, { useEffect, useState } from 'react';
import { ConfigProvider, Layout, Menu, Row, Col, Radio } from 'antd';
// @ts-ignore
import ForkMeOnGithub from 'fork-me-on-github';
import { Link, Dispatch } from 'umi';
import zh_CN from 'antd/es/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';
import { Menus } from '@/constant';
import { RibbonsFun } from '@/utils/lib/bg';
import styles from './index.less';

const { Header, Content, Footer } = Layout;

export interface BasicLayoutType {
  dispatch?: Dispatch;
}

const BasicLayout: React.FC<BasicLayoutType> = (props) => {
  const { dispatch, children } = props;
  const [languages, setLanguages] = useState<any>(enUS);

  console.log(dispatch);

  useEffect(() => {
    // 引入canvas背景
    RibbonsFun();
  }, []);

  const changeLocale = (e: any) => {
    const localeValue = e.target.value;
    setLanguages(localeValue);
  };

  // 定义
  const defaultFooterDom = (
    <Footer className={styles.footer}>
      <Row>
        <Col span={12} offset={8} className={styles.footer_info}>
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
        <ForkMeOnGithub
          repo="https://github.com/whatthefoo/fork-me-on-github"
          colorBackground="black"
          colorOctocat="white"
        />
        <div className={styles.init_header}>
          {/* <img src="@/assets/icon/star_big.ico" width="64" height="64" alt="logo"/> */}
        </div>
        <ConfigProvider locale={languages}>
          <Layout>
            <Header className={styles.header}>
              <div className={styles.logo} />
              <Row>
                <Col span={16}>
                  <Menu
                    theme="light"
                    mode="horizontal"
                    className={styles.menu}
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
                </Col>
                <Col span={8}>
                  <div className={styles.languages_select}>
                    <Radio.Group value={languages} onChange={changeLocale}>
                      <Radio.Button key="en" value={enUS}>
                        English
                      </Radio.Button>
                      <Radio.Button key="cn" value={zh_CN}>
                        中文
                      </Radio.Button>
                    </Radio.Group>
                  </div>
                </Col>
              </Row>
            </Header>
            <Content
              className="site-layout"
              style={{ padding: '0 50px', marginTop: 64 }}
            >
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
