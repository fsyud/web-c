import React from 'react';

import SingleComment from './SingleComment';

import styles from './index.less';
interface CommentsListProps {
  commentList: any[];
}

const CommentsList: React.FC<CommentsListProps> = (props) => {
  const { commentList } = props;
  return (
    <div className={styles.comment_list}>
      {commentList.map((item: any, index: number) => {
        return (
          <div className={styles.one_item} key={index}>
            <div className={styles.comment_main}>
              <SingleComment item={item} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommentsList;
