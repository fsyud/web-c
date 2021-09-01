import React, { useEffect, useState } from 'react';
import { Avatar, message } from 'antd';
import { useDispatch } from 'umi';
import { UserOutlined } from '@ant-design/icons';
import { ReactComponent as Comits } from '@/assets/svg/commit.svg';
import { ReactComponent as Greats } from '@/assets/svg/great.svg';
import Comment from '@/components/SKy/SkyCommitBoard/Comment';
import { addTwoComment } from '@/service/comment';
import SecondCommit from './SecondCommit';
import { DiffDay } from '@/utils/utils';
import { StorageStore } from '@/utils/authority';
import styles from './SingleComment.less';

export interface SingleCommentProps {
  item: any;
}

const SingleComment: React.FC<SingleCommentProps> = (props) => {
  const dispatch = useDispatch();
  const { item } = props;
  const [commitSta, setCommitSta] = useState<boolean>(false);

  document.addEventListener('click', (e) => {
    setCommitSta(false);
  });

  // 二级评论提交
  const sumbitForm = async (values: string, item: any): Promise<any> => {
    const params = {
      article_id: item.article_id,
      reply_content: values,
      reply_to_user_id: item.oneComment?.user_id,
      user_id: StorageStore.getUserId(),
      commit_id: item._id,
    };

    const { data } = await addTwoComment(params);

    console.log(data);

    if (data) {
      message.success(data.msg);
      dispatch({
        type: 'article/getComments',
        payload: {
          article_id: item.article_id || 1,
        },
      });
      setCommitSta(false);
    } else {
      message.error('回复留言失败！');
    }
  };

  return (
    <div className={styles.single_comment}>
      {/* 左侧 */}
      <div className={styles.item_left}>
        {item?.oneComment?.avatar ? (
          <img src={item?.oneComment?.avatar} />
        ) : (
          <Avatar icon={<UserOutlined />} />
        )}
      </div>

      {/* 右侧 */}
      <div className={styles.item_right}>
        {/* 一级评论内容 */}
        <div className={styles.item_main}>
          <div className={styles.user_box}>
            <a>
              {item?.oneComment?.user_name}{' '}
              {item?.oneComment?.type === 1 && (
                <span className={styles.is_auth}>（博主）</span>
              )}
            </a>
            <span className={styles.line}></span>
            <time>{DiffDay(item.create_times)}</time>
          </div>
          <div className={styles.content}>{item.content}</div>
          <div className={styles.action_box}>
            <div className={styles.one}>
              <Greats />0
            </div>
            <div
              className={styles.one}
              onClick={(e: any) => {
                e.nativeEvent.stopImmediatePropagation();
                setCommitSta(true);
              }}
            >
              <Comits />
            </div>
          </div>
        </div>
        {/* 回复模块 */}
        <div className={styles.comment_wrapper}>
          <div className={styles.wrapper_list}>
            {/* 一级回复组件 */}
            <div className={styles.comment_form}>
              {commitSta && (
                <Comment
                  sumbitForm={(values: string) => {
                    sumbitForm(values, item);
                  }}
                  placeholder={`回复${item?.oneComment?.user_name}...`}
                  commitSta={false}
                />
              )}
            </div>

            <div className={styles.sub_comment_list}>
              {Array.isArray(item?.secondCommit) &&
                item.secondCommit.map((comItem: any, index: number) => (
                  <SecondCommit
                    parentItem={item}
                    comItem={comItem}
                    key={index}
                    curIndex={index}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleComment;
