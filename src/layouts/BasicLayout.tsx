import React, { useEffect, useState } from 'react';
import { ConfigProvider, Layout } from 'antd';
// @ts-ignore
import { useHistory, useSelector } from 'umi';
// import enUS from 'antd/lib/locale/en_US';
import zh_CN from 'antd/es/locale/zh_CN';
import TeHome from './content/TeHome';
import TeAwhile from './content/TeAwhile';
import TeBook from './content/TeBook';
import Header from './Header';
import TeArt from './content/TeArt';
import { Menus, menuTitle } from '@/constant';
import githubs from '@/assets/svg/GitHub.svg';
import styles from './index.less';

const { Content } = Layout;

export interface BasicLayoutType {}

const BasicLayout: React.FC<BasicLayoutType> = (props) => {
  const history = useHistory();
  const curPath = history.location.pathname;
  const { scroller } = useSelector(({ global }: any) => {
    return { ...global };
  });
  const { children } = props;
  const [languages, setLanguages] = useState<any>(zh_CN);

  useEffect(() => {
    window.addEventListener(
      'error',
      (errorEvent) => {
        // console.log(errorEvent);
        // if (errorEvent.type === 'error') {
        //   history.push('./404');
        // }
      },
      true,
    );
  }, []);

  const curLanguages = (val: any): void => {
    setLanguages(val);
  };

  // 不同路由之间
  const DiffContent = <T extends React.ReactNode>(ELE: T): React.ReactNode => {
    if (curPath.includes(Menus[0].path) || curPath === '/') {
      return <TeHome children={ELE} />;
    } else if (curPath.includes(Menus[1].path)) {
      document.title = Menus[1].label;
      return <TeAwhile children={ELE} />;
    } else if (
      curPath.includes(Menus[2].path) ||
      curPath.includes('404') ||
      curPath.includes('tag-column') ||
      curPath.includes('writeArt') ||
      curPath.includes('user')
    ) {
      return <TeBook children={ELE} />;
    } else if (curPath.includes('detail')) {
      return <TeArt children={ELE} />;
    }
  };

  // defaultFooterDom
  const ContentNode = (): React.ReactNode => {
    return (
      <div className={styles.init_page}>
        <div className={styles.github}>
          <a href="https://github.com/starryskystar">
            <img src={githubs} />
          </a>
        </div>
        <ConfigProvider locale={languages}>
          <Layout>
            {!scroller && <Header curLanguages={curLanguages} />}
            <Content className={styles.site_layout}>
              {DiffContent(children)}
            </Content>
          </Layout>
        </ConfigProvider>
      </div>
    );
  };

  const IS_CHILDREN = (): any => {
    return (
      <>
        {curPath.includes('protocol') || curPath.includes('privacy') ? (
          <div>{children}</div>
        ) : (
          ContentNode()
        )}
      </>
    );
  };

  return <>{IS_CHILDREN()}</>;
};

export default BasicLayout;
