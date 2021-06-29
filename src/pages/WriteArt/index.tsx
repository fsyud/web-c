import React, { useState } from 'react';
import { Button, Card, Drawer } from 'antd';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import 'braft-editor/dist/output.css';
import styles from './index.less';
import './index.css';

const WriteArt: React.FC<{}> = () => {
  const [value, setValue] = useState<any>(
    BraftEditor.createEditorState('<p>nice <b>day!</b></p><br>'),
  );
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
  };

  return (
    <div className={styles.write_art}>
      <Card>
        <div className={styles.header}>
          <Button type="primary" size="middle" onClick={submit}>
            发布
          </Button>
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
        placement="right"
        closable={false}
        width={1000}
        onClose={() => setVisible(false)}
        className={styles.curDrawer}
        visible={visible}
      >
        <div
          className="braft-output-content"
          dangerouslySetInnerHTML={{
            __html: value.toHTML(),
          }}
        />
      </Drawer>
    </div>
  );
};

export default WriteArt;
