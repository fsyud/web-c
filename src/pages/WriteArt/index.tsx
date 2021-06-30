import React, { useState } from 'react';
import { Button, Card, Drawer, Input, message } from 'antd';
import BraftEditor from 'braft-editor';
import { useDispatch, useSelector } from 'dva';
import 'braft-editor/dist/index.css';
import 'braft-editor/dist/output.css';
import styles from './index.less';
import './index.css';

const WriteArt: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<any>(
    BraftEditor.createEditorState('<p>nice <b>day!</b></p><br>'),
  );
  const [curtitle, setCurtitle] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);

  // 预览
  const preview = () => {
    setVisible(true);
  };

  const extendControls: any = [
    {
      key: 'custom-button',
      type: 'button',
      text: '预览',
      onClick: preview,
    },
  ];

  const submit = async (): Promise<any> => {
    console.log(value.toHTML());

    if (!curtitle) {
      message.error('请填写标题！');
      return;
    }

    const params: API.artParams = {
      title: curtitle,
      content: value.toHTML(),
      type: 1,
      author: 'naze',
    };

    dispatch({
      type: 'article/createArticle',
      payload: params,
    });
  };

  return (
    <div className={styles.write_art}>
      <Card>
        <div className={styles.header}>
          <Button type="primary" size="middle" onClick={submit}>
            发布
          </Button>

          <Input
            placeholder="请输入标题"
            onChange={(e: any) => setCurtitle(e.target.value)}
          />
        </div>
        <BraftEditor
          value={value}
          onChange={(val: any) => {
            setValue(val);
          }}
          extendControls={extendControls}
        />
      </Card>
      <Drawer
        title="预览"
        placement="top"
        closable={false}
        width={1000}
        onClose={() => setVisible(false)}
        className={styles.curDrawer}
        visible={visible}
      >
        <div
          style={{
            width: 1000,
            margin: '0 auto',
          }}
        >
          <div
            className="braft-output-content"
            dangerouslySetInnerHTML={{
              __html: value.toHTML(),
            }}
          />
        </div>
      </Drawer>
    </div>
  );
};

export default WriteArt;
