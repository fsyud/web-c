import React, { useState, useEffect } from 'react';
import { Button, Card, Drawer, Input, message, Form } from 'antd';
import classnames from 'classnames';
import { useDispatch } from 'dva';
import { Editor, Viewer } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import gemoji from '@bytemd/plugin-gemoji';
import 'bytemd/dist/index.min.css';

import PublishForm from '@/components/Article/PublishForm';
import styles from './index.less';

const plugins = [
  gfm(),
  gemoji(),
  // Add more plugins here
];

const WriteArt: React.FC<{}> = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [curtitle, setCurtitle] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);
  const [pubVis, setPubVis] = useState<boolean>(true);
  const [img_url, setImg_url] = useState<any>();

  const [value, setValue] = useState('');

  useEffect(() => {
    document.addEventListener('click', (e: any) => {
      if (e.target.nodeName !== 'INPUT') {
        setPubVis(true);
      }
    });
  }, []);

  const submit = async (): Promise<any> => {
    if (!curtitle) {
      message.error('请填写标题！');
      return;
    }

    form.validateFields().then(async (data: any) => {
      console.log(data);

      if (!img_url) {
        message.error('请上传封面图片！');
        return;
      }

      const { desc, type } = data;

      const params: API.artParams = {
        title: curtitle,
        content: value,
        type,
        author: 'naze',
        img_url,
        desc,
      };

      console.log(params);

      const response: any = await dispatch({
        type: 'article/createArticle',
        payload: params,
      });

      if (response?.success) {
        setPubVis(true);
        form.resetFields();
        setImg_url('');
        setCurtitle('');
      }
    });
  };

  const pannelStyle = (): string => {
    return classnames({
      [styles.panel]: true,
      [styles.panel_dis]: pubVis,
    });
  };

  return (
    <div className={styles.write_art}>
      <Card>
        <div className={styles.header}>
          <Button
            type="primary"
            size="middle"
            onClick={(e: any) => {
              e.nativeEvent.stopImmediatePropagation();
              setPubVis(false);
            }}
          >
            发布
          </Button>

          <div
            className={pannelStyle()}
            onClick={(e: any) => {
              e.nativeEvent.stopImmediatePropagation();
            }}
          >
            <div className={styles.panel_title}>发布文章</div>
            <div className={styles.panel_main}>
              <PublishForm
                handleUploadImg={(params: any) => setImg_url(params)}
                form={form}
              />
            </div>
            <div className={styles.panel_footer}>
              <Button
                type="primary"
                size="middle"
                onClick={(e: any) => {
                  e.nativeEvent.stopImmediatePropagation();
                  submit();
                }}
              >
                确定并发布
              </Button>
              <Button
                type="default"
                size="middle"
                onClick={(e: any) => {
                  setPubVis(true);
                }}
              >
                取消
              </Button>
            </div>
          </div>

          <Input
            placeholder="请输入标题"
            value={curtitle}
            onChange={(e: any) => setCurtitle(e.target.value)}
          />
        </div>
        <div className={styles.edit_mark}>
          <Editor
            value={value}
            plugins={plugins}
            onChange={(v) => {
              setValue(v);
            }}
          />
        </div>
      </Card>
      <Drawer
        title="预览"
        placement="top"
        closable={true}
        height={1000}
        onClose={() => setVisible(false)}
        className={styles.curDrawer}
        visible={visible}
      >
        <div
          style={{
            width: 1000,
            margin: '0 auto',
            paddingBottom: 100,
          }}
        ></div>
      </Drawer>
    </div>
  );
};

export default WriteArt;
