import React, { useEffect, useState } from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import great from '@/assets/svg/great.svg';
import commit from '@/assets/svg/commit.svg';

import { DiffDay } from '@/utils/utils';

import styles from './index.less';

interface CommentsListProps {
  commentList: any[];
}

const CommentsList: React.FC<CommentsListProps> = (props) => {
  const { commentList } = props;

  console.log(commentList, 'commentList');

  return (
    <div className={styles.comment_list}>
      {commentList.map((item: any, index: number) => {
        return (
          <div className={styles.one_item} key={index}>
            <div className={styles.item_left}>
              {item?.oneComment?.avatar ? (
                <img src={item?.oneComment?.avatar} />
              ) : (
                <Avatar icon={<UserOutlined />} />
              )}
            </div>

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
                    <img src={great} alt="" />0
                  </div>
                  <div className={styles.one}>
                    <img src={commit} alt="" />0
                  </div>
                </div>
              </div>
              <div className={styles.item_extra}></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommentsList;
