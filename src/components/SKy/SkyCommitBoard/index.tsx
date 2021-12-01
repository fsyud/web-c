import React, { useState, useEffect } from 'react';
import { message, Divider } from 'antd';
import { useDispatch } from 'umi';
import { DiffDay } from '@/utils/utils';
import great from '@/assets/svg/greats.svg';
import commit from '@/assets/svg/commit.svg';
import share1 from '@/assets/svg/share1.svg';
import { topicConfList } from '@/constant';
import { StorageStore } from '@/utils/authority';
import { addTwoAwhile } from '@/service/awhile';
import AwhileSecondComment from '@/components/Article/CommentsList/AwhileSecondComment';
import Comment from './Comment';
import styles from './index.less';

interface SkyCommitBoardProps {
  Item: any;
}

// 时刻留言板
const SkyCommitBoard: React.FC<SkyCommitBoardProps> = (props) => {
  const dispatch = useDispatch();
  const { Item } = props;
  const [commitSta, setCommitSta] = useState<boolean>(false);
  const [clears, setClears] = useState<boolean>(false);

  const { oneWhile, secondWhile } = Item;

  useEffect(() => {
    document.addEventListener('click', (e) => {
      setCommitSta(false);
    });
  }, []);

  const sumbitForm = async (values: string): Promise<any> => {
    const params = {
      awhile_id: Item?._id,
      content: values,
      reply_to_user_id: oneWhile?.user_id,
      user_id: StorageStore.getUserId(),
    };

    const data = await addTwoAwhile(params);

    if (data.code === 0) {
      message.success('回复成功！');
      setClears(true);
      setTimeout(() => {
        setClears(false);
      }, 200);
      dispatch({
        type: 'awhile/IsRefresh',
        payload: {
          isRefresh: true,
        },
      });
    } else {
      message.success('回复失败！');
    }
  };

  return (
    <div className={styles.commit_board}>
      <div className={styles.header}>
        <div className={styles.art_head}>
          <a href="">
            <img src={oneWhile?.avatar} />
          </a>
          <div className={styles.art_h__right}>
            <div className={styles.name}>{oneWhile?.user_name}</div>
            <div className={styles.meta}>
              <time>{DiffDay(oneWhile?.create_times)}</time>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.main_content}>{oneWhile?.content}</div>
      </div>
      {Item?.tag !== 999 && (
        <div className={styles.tags}>
          #
          {
            topicConfList.find((s: GLOBAL.tagType) => s.type === Item?.tag)
              ?.name
          }
          #
        </div>
      )}

      <div className={styles.footer}>
        <div className={styles.f_one}>
          <img src={great} />
        </div>
        <div
          className={styles.f_one}
          onClick={(e: any) => {
            e.nativeEvent.stopImmediatePropagation();
            setCommitSta(true);
          }}
        >
          <img src={commit} />

          {Item?.meta?.comments === 0 ? (
            <strong>评论</strong>
          ) : (
            Item?.meta?.comments
          )}
        </div>
        <div className={styles.f_one}>
          <img src={share1} />
          <strong>分享</strong>
        </div>
      </div>
      {commitSta && (
        <>
          <Comment
            placeholder="输入评论（Enter换行，⌘ + Enter发送）"
            sumbitForm={sumbitForm}
            commitSta={false}
            isClear={clears}
          />
          <div
            onClick={(e: any) => {
              e.nativeEvent.stopImmediatePropagation();
            }}
          >
            <Divider />
            <div className={styles.awhile_arapper}>
              <div className={styles.title}>
                全部评论（{Item?.meta?.comments}）
              </div>
              {Array.isArray(secondWhile) &&
                secondWhile.map((s: any, i: number) => (
                  <AwhileSecondComment
                    key={i}
                    comItem={s}
                    curIndex={i}
                    curItem={Item}
                  />
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SkyCommitBoard;
