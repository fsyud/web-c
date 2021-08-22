import React, { useEffect, useState } from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ReactComponent as Comits } from '@/assets/svg/commit.svg';
import { ReactComponent as Greats } from '@/assets/svg/great.svg';
import Comment from '@/components/SKy/SkyCommitBoard/Comment';
import { addTwoComment } from '@/service/comment';

import { DiffDay } from '@/utils/utils';

import styles from './index.less';

interface CommentsListProps {
  commentList: any[];
}

const CommentsList: React.FC<CommentsListProps> = (props) => {
  const { commentList } = props;

  const [commitSta, setCommitSta] = useState<boolean>(false);

  document.addEventListener('click', (e) => {
    setCommitSta(false);
  });

  console.log(commentList, 'commentList');

  // 二级评论提交
  const sumbitForm = async (values: string, item: any): Promise<any> => {
    console.log(values, item);

    const params = {
      article_id: item.article_id,
      reply_content: values,
      reply_to_user_id: item.oneComment?.user_id,
      user_id: localStorage.STARRY_STAR_SKY_ID,
    };

    const data = await addTwoComment(params);

    console.log(data);
  };

  return (
    <div className={styles.comment_list}>
      {commentList.map((item: any, index: number) => {
        return (
          <div className={styles.one_item} key={index}>
            <div className={styles.comment_main}>
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
                <div className={styles.item_main}>
                  <div className={styles.user_box}>
                    <a>{item?.oneComment?.user_name}</a>
                    <span></span>
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
                <div className={styles.comment_wrapper}>
                  <div className={styles.wrapper_list}>
                    <div className={styles.wrapper_one}></div>

                    <div className={styles.comment_form}>
                      {commitSta && (
                        <Comment
                          sumbitForm={(values: string) => {
                            sumbitForm(values, item);
                          }}
                          placeholder={`回复${item?.oneComment.user_name}...`}
                          commitSta={false}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommentsList;
