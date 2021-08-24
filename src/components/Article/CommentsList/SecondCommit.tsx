import React, { useEffect, useState } from 'react';
import { useDispatch } from 'umi';
import { Avatar, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Comment from '@/components/SKy/SkyCommitBoard/Comment';
import { ReactComponent as Comits } from '@/assets/svg/commit.svg';
import { ReactComponent as Greats } from '@/assets/svg/great.svg';
import { addTwoComment } from '@/service/comment';
import { DiffDay } from '@/utils/utils';
import styles from './SecondCommit.less';

export interface SecondCommitProps {
  comItem: any;
  parentItem: any;
}

const SecondCommit: React.FC<SecondCommitProps> = (props) => {
  const dispatch = useDispatch();
  const { comItem, parentItem } = props;

  document.addEventListener('click', (e) => {
    setSecondCommitSta(false);
  });

  const [secondCommitSta, setSecondCommitSta] = useState<boolean>(false);

  // 三级级评论提交
  const sumbitForm = async (values: string): Promise<any> => {
    const params = {
      article_id: parentItem.article_id,
      reply_content: values,
      reply_to_user_id: comItem.user?.user_id,
      user_id: localStorage.STARRY_STAR_SKY_ID,
      commit_id: parentItem._id,
    };

    const data = await addTwoComment(params);

    if (data.code === 0) {
      message.success('回复留言成功！');

      dispatch({
        type: 'article/getComments',
        payload: {
          article_id: parentItem.article_id || 1,
        },
      });
      setSecondCommitSta(false);
    } else {
      message.error('回复留言失败！');
    }
  };

  return (
    <div className={styles.sub_comment}>
      <div className={styles.sub_avator}>
        <a>
          {comItem.user?.avatar ? (
            <img src={comItem.user?.avatar} />
          ) : (
            <Avatar icon={<UserOutlined />} />
          )}
        </a>
      </div>

      <div className={styles.sub_main}>
        <div className={styles.user_box}>
          <span>{comItem.user?.user_name}</span>
          <span>回复</span>
          <span>{comItem.to_user?.user_name}</span>
          <span className={styles.line}></span>
          <span>{DiffDay(comItem.create_times)}</span>
        </div>

        <div className={styles.sub_content}>{comItem.reply_content}</div>

        <div className={styles.action_box}>
          <div
            className={styles.one}
            onClick={(e: any) => {
              e.nativeEvent.stopImmediatePropagation();
            }}
          >
            <Greats />0
          </div>
          <div
            className={styles.one}
            onClick={(e: any) => {
              e.nativeEvent.stopImmediatePropagation();
              setSecondCommitSta(true);
            }}
          >
            <Comits />
          </div>
        </div>
        <div className={styles.sub_comment_form}>
          {secondCommitSta && (
            <Comment
              style={{ background: '#fff' }}
              sumbitForm={(values: string) => {
                sumbitForm(values);
              }}
              placeholder={`回复${comItem.user?.user_name}...`}
              commitSta={false}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SecondCommit;
