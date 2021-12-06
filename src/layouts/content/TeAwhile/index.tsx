import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'umi';
import { Row, Col, Skeleton, Radio, Space, Affix } from 'antd';
import { useMediaQuery } from 'beautiful-react-hooks';
import { getHotAwhile } from '@/service/awhile';
import { topicConfList } from '@/constant';
import styles from './index.less';

interface TeAwhileProps {
  children: React.ReactNode | React.ReactElement;
}

const TeAwhile: React.FC<TeAwhileProps> = ({ children }) => {
  const [hots, setHots] = useState<any[]>([]);
  const [curRadio, setCurRadio] = useState<number>(999);

  const { curIndex } = useSelector(({ awhile }: any) => {
    return { ...awhile };
  });

  const dispatch = useDispatch();
  const isTabletOrMobile = useMediaQuery('(max-width: 1024px)');

  useEffect(() => {
    getHotArt();
  }, []);

  useEffect(() => {
    if (curIndex === 999) {
      setCurRadio(curIndex);
    }
  }, [curIndex]);

  const getHotArt = async (): Promise<any> => {
    const { data } = await getHotAwhile();
    if (data) {
      setHots(data);
    }
  };

  const onChange = (e: any): void => {
    const { value } = e.target;
    setCurRadio(value);
    dispatch({
      type: 'awhile/awhileIndex',
      payload: {
        curIndex: value,
      },
    });
  };

  const searchHot = (pmrams: any) => {
    const w: any = window.open('about:blank');
    w.location.href = `/detail/${pmrams}`;
  };

  return (
    <div className={styles.teawhile}>
      <Row>
        {!isTabletOrMobile && (
          <Col span={3} className={styles.teawhile_left}>
            <Affix className={styles.affix} offsetTop={80}>
              <aside>
                <Skeleton active loading={false}>
                  <Space direction="vertical">
                    <Radio.Group
                      buttonStyle="solid"
                      onChange={onChange}
                      value={curRadio}
                    >
                      {[
                        ...topicConfList.slice(0, 9),
                        ...[{ type: 1000, name: '更多片刻 +' }],
                      ].map((s: GLOBAL.tagType, index: number) => (
                        <Radio.Button key={index} value={s.type}>
                          {s.name}
                        </Radio.Button>
                      ))}
                    </Radio.Group>
                  </Space>
                </Skeleton>
              </aside>
            </Affix>
          </Col>
        )}

        <Col span={isTabletOrMobile ? 24 : 15} className={styles.teawhile_main}>
          <section className={styles.init_section}>{children}</section>
        </Col>

        {!isTabletOrMobile && (
          <Col span={6} className={styles.teawhile_aside}>
            <aside>
              <Skeleton active loading={false}>
                <div className={`${styles.tehome_one} ${styles.tehome_hot}`}>
                  <h5>热门文章</h5>
                  <ul className={styles.tehome_moment}>
                    {hots.map((s: any, i: number) => (
                      <li
                        onClick={() => {
                          searchHot(s._id);
                        }}
                        key={i}
                        title={s.title}
                      >
                        {s?.oneWhile?.content || ''}
                      </li>
                    ))}
                  </ul>
                </div>
              </Skeleton>
            </aside>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default TeAwhile;
