import React, { useEffect, useState } from 'react';
import { ConfigProvider, Layout, Row, Col } from 'antd';
// @ts-ignore
import ForkMeOnGithub from 'fork-me-on-github';
import enUS from 'antd/lib/locale/en_US';
import { Dispatch } from 'umi';
import { RibbonsFun } from '@/utils/lib/bg';
import Header from './Header';
import styles from './index.less';

const { Content, Footer } = Layout;

export interface BasicLayoutType {
  dispatch?: Dispatch;
}

const BasicLayout: React.FC<BasicLayoutType> = (props) => {
  const { dispatch, children } = props;
  const [languages, setLanguages] = useState<any>(enUS);

  useEffect(() => {
    // 引入canvas背景
    RibbonsFun();
  }, []);

  const curLanguages = (val: any): void => {
    setLanguages(val);
  };

  // 定义
  const defaultFooterDom = (
    <Footer className={styles.footer}>
      <Row>
        <Col span={12} offset={8} className={styles.footer_info}>
          ©2021 ｜ starryskystar
          <a href="" target="_blank">
            皖ICP备20000463号
          </a>
        </Col>
      </Row>
    </Footer>
  );

  const ContentNode = (): React.ReactNode => {
    return (
      <div className={styles.init_page}>
        <ForkMeOnGithub
          repo="https://github.com/starryskystar"
          colorBackground="black"
          colorOctocat="white"
        />
        <div className={styles.init_header}>
          {/* <img src="@/assets/icon/star_big.ico" width="64" height="64" alt="logo"/> */}
        </div>
        <ConfigProvider locale={languages}>
          <Layout>
            <Header curLanguages={curLanguages} />
            <Content
              className="site-layout"
              style={{ padding: '0 50px', marginTop: 64 }}
            >
              <div className="site-layout-background" style={{ padding: 24 }}>
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
