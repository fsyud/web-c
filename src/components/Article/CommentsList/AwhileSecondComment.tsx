import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { Avatar, message } from 'antd';
import { useDispatch } from 'umi';
import { UserOutlined } from '@ant-design/icons';
import Comment from '@/components/SKy/SkyCommitBoard/Comment';
import { ReactComponent as Comits } from '@/assets/svg/commit.svg';
import { ReactComponent as Greats } from '@/assets/svg/great.svg';
import { addTwoAwhile } from '@/service/awhile';
import { DiffDay } from '@/utils/utils';
import { StorageStore } from '@/utils/authority';
import styles from './AwhileSecondComment.less';

export interface AwhileSecondCommentProps {
  comItem: any;
  curIndex: number;
  curItem: any;
}

const AwhileSecondComment: React.FC<AwhileSecondCommentProps> = (props) => {
  const dispatch = useDispatch();
  const { comItem, curIndex, curItem } = props;

  const [secondCommitSta, setSecondCommitSta] = useState<boolean>(false);
  const [clears, setClears] = useState<boolean>(false);

  useEffect(() => {
    document.addEventListener('click', (e) => {
      setSecondCommitSta(false);
    });
  }, []);

  // 三级级评论提交
  const sumbitForm = async (values: string): Promise<any> => {
    const params = {
      awhile_id: curItem?._id,
      content: values,
      reply_to_user_id: curItem?.oneWhile?.user_id,
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

  const oneSpan = () => {
    return classnames({
      [styles.one_span]: curIndex === 0,
    });
  };

  return (
    <div className={styles.sub_comment_form}>
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
        <div
          className={styles.user_box}
          onClick={(e: any) => {
            e.nativeEvent.stopImmediatePropagation();
            setSecondCommitSta(false);
          }}
        >
          <span className={oneSpan()}>
            {comItem.user?.user_name}{' '}
            {comItem?.user?.type === 1 && (
              <span className={styles.is_auth}>（博主）</span>
            )}{' '}
          </span>
          {curIndex !== 0 && (
            <>
              <span>回复</span>
              <span>{comItem.to_user?.user_name}</span>
            </>
          )}

          <span className={styles.line}></span>
          <span>{DiffDay(comItem.create_times)}</span>
        </div>

        <div
          className={styles.sub_content}
          onClick={(e: any) => {
            e.nativeEvent.stopImmediatePropagation();
            setSecondCommitSta(false);
          }}
        >
          {comItem.reply_content}
        </div>

        <div className={styles.action_box}>
          <div
            className={styles.one}
            onClick={(e: any) => {
              e.nativeEvent.stopImmediatePropagation();
              setSecondCommitSta(false);
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
        {secondCommitSta && (
          <Comment
            style={{ background: '#f7f8fa', width: '100%' }}
            sumbitForm={(values: string) => {
              sumbitForm(values);
            }}
            isClear={clears}
            placeholder={`回复${comItem.user?.user_name}...`}
            commitSta={false}
          />
        )}
      </div>
    </div>
  );
};

export default AwhileSecondComment;
