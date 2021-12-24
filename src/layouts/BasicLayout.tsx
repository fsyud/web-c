import React, { useEffect, useState } from 'react';
import { ConfigProvider, Layout } from 'antd';
// @ts-ignore
import { useHistory, useSelector } from 'umi';
// import enUS from 'antd/lib/locale/en_US';
import zh_CN from 'antd/es/locale/zh_CN';
import TeFirst from './content/TeFirst';
import TeHome from './content/TeHome';
import TeAwhile from './content/TeAwhile';
import TeBook from './content/TeBook';
import Header from './Header';
import TeArt from './content/TeArt';
import { Menus } from '@/constant';
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
  const DiffContent = <T extends React.ReactNode>(
    ELEMENT: T,
  ): React.ReactNode => {
    if (curPath === '/') {
      return <TeFirst children={ELEMENT} />;
    } else if (curPath.includes(Menus[0].path)) {
      return <TeHome children={ELEMENT} />;
    } else if (curPath.includes(Menus[1].path)) {
      document.title = Menus[1].label;
      return <TeAwhile children={ELEMENT} />;
    } else if (
      curPath.includes('about') ||
      curPath.includes('project') ||
      curPath.includes('404') ||
      curPath.includes('tag-column') ||
      curPath.includes('writeArt') ||
      curPath.includes('user') ||
      curPath.includes('pigeonhole')
    ) {
      return <TeBook children={ELEMENT} />;
    } else if (curPath.includes('detail')) {
      return <TeArt children={ELEMENT} />;
    }
  };

  // defaultFooterDom
  const ContentNode = (): React.ReactNode => {
    return (
      <section className={`${styles.join_section}`}>
        <div className={styles.join_element_one}>
          <img src={require('@/assets/images/join/icon-1.png')} alt="icon" />
        </div>
        <div className={styles.join_element_two}>
          <img src={require('@/assets/images/join/icon-2.png')} alt="icon" />
        </div>
        <div className={styles.join_element_three}>
          <img src={require('@/assets/images/join/icon-3.png')} alt="icon" />
        </div>
        <div className={styles.join_element_four}>
          <img src={require('@/assets/images/join/icon-4.png')} alt="icon" />
        </div>
        <div className={styles.join_element_five}>
          <img src={require('@/assets/images/join/icon-5.png')} alt="icon" />
        </div>
        <div className={styles.join_element_six}>
          <img src={require('@/assets/images/join/icon-6.png')} alt="icon" />
        </div>
        <div className={styles.join_element_seven}>
          <img src={require('@/assets/images/join/icon-7.png')} alt="icon" />
        </div>
        <div className={styles.join_element_eight}>
          <img src={require('@/assets/images/join/icon-5.png')} alt="icon" />
        </div>
        <div className={styles.join_element_nine}>
          <img src={require('@/assets/images/join/icon-6.png')} alt="icon" />
        </div>
        <div className={styles.join_element_ten}>
          <img src={require('@/assets/images/join/icon-7.png')} alt="icon" />
        </div>
        <div className={styles.join_element_eleven}>
          <img src={require('@/assets/images/join/icon-5.png')} alt="icon" />
        </div>
        <div className={styles.join_element_twelve}>
          <img src={require('@/assets/images/join/icon-6.png')} alt="icon" />
        </div>
        <div className={styles.join_element_thirteen}>
          <img src={require('@/assets/images/join/icon-7.png')} alt="icon" />
        </div>
        <div className={styles.join_element_fourteen}>
          <img src={require('@/assets/images/join/icon-5.png')} alt="icon" />
        </div>
        <div className={styles.join_element_fifteen}>
          <img src={require('@/assets/images/join/icon-6.png')} alt="icon" />
        </div>
        <div className={styles.join_element_sixteen}>
          <img src={require('@/assets/images/join/icon-7.png')} alt="icon" />
        </div>

        <div className={styles.init_page}>
          <ConfigProvider locale={languages}>
            <Layout>
              {!scroller && <Header curLanguages={curLanguages} />}
              {scroller && curPath.includes(Menus[0].path) && (
                <div className={styles.second_header}></div>
              )}
              <Content className={styles.site_layout}>
                {DiffContent(children)}
              </Content>
            </Layout>
          </ConfigProvider>
        </div>
      </section>
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
