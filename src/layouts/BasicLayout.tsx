import React, { useEffect, useState } from 'react';
import { ConfigProvider, Layout, Row, Col } from 'antd';
// @ts-ignore
import ForkMeOnGithub from 'fork-me-on-github';
import { useHistory } from 'umi';
import enUS from 'antd/lib/locale/en_US';
import { Dispatch } from 'umi';
import TeHome from './content/TeHome';
import TeAwhile from './content/TeAwhile';
import TeBook from './content/TeBook';
import Header from './Header';
import TeArt from './content/TeArt';
import { Menus } from '@/constant';
import styles from './index.less';

const { Content, Footer } = Layout;

export interface BasicLayoutType {
  dispatch?: Dispatch;
}

const BasicLayout: React.FC<BasicLayoutType> = (props) => {
  const history = useHistory();
  const { dispatch, children } = props;
  const [languages, setLanguages] = useState<any>(enUS);

  useEffect(() => {
    // 路由监听不同模版
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

  // 不同路由之间
  const DiffContent = <T extends React.ReactNode>(ELE: T): any => {
    const curPath = history.location.pathname;
    if (curPath.includes(Menus[0].path) || curPath === '/') {
      return <TeHome children={ELE} />;
    }
    if (curPath.includes(Menus[1].path)) {
      return <TeAwhile children={ELE} />;
    }
    if (curPath.includes(Menus[2].path)) {
      return <TeBook children={ELE} />;
    }
    if (curPath.includes('artDetail')) {
      return <TeArt children={ELE} />;
    }
  };

  // defaultFooterDom
  const ContentNode = (): React.ReactNode => {
    return (
      <div className={styles.init_page}>
        <div className={styles.github}>
          <ForkMeOnGithub
            repo="https://github.com/starryskystar"
            colorBackground="black"
            colorOctocat="white"
          />
        </div>
        <ConfigProvider locale={languages}>
          <Layout>
            <Header curLanguages={curLanguages} />
            <Content className={styles.site_layout}>
              {DiffContent(children)}
            </Content>
          </Layout>
        </ConfigProvider>
      </div>
    );
  };

  return <>{ContentNode()}</>;
};

export default BasicLayout;
