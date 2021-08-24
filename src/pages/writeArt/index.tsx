import React, { useState, useEffect } from 'react';
import { Button, Card, Input, message, Form } from 'antd';
import classnames from 'classnames';
import { useDispatch } from 'dva';
import { Editor, Viewer } from '@bytemd/react';
import { Image } from 'mdast';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import gemoji from '@bytemd/plugin-gemoji';
import math from '@bytemd/plugin-math';
import footnotes from '@bytemd/plugin-footnotes';
import { upLoadFiles } from '@/service/common';
import 'bytemd/dist/index.min.css';

import PublishForm from '@/components/Article/PublishForm';
import styles from './index.less';

const plugins = [
  gfm(),
  gemoji(),
  highlight(),
  math(),
  footnotes(),
  // Add more plugins here
];

const WriteArt: React.FC<{}> = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [curtitle, setCurtitle] = useState<string>('');
  const [pubVis, setPubVis] = useState<boolean>(true);
  const [img_url, setImg_url] = useState<any>();

  const [value, setValue] = useState<string>('');

  useEffect(() => {
    document.addEventListener('click', (e: any) => {
      if (e.target.nodeName !== 'INPUT') {
        setPubVis(true);
      }
    });
  }, []);

  const submit = async (): Promise<any> => {
    if (!localStorage.STARRY_STAR_SKY_ID) {
      message.error('请先登录！');
      return;
    }

    if (!curtitle) {
      message.error('请填写标题！');
      return;
    }

    if (!value) {
      message.error('内容不能为空！');
      return;
    }

    form.validateFields().then(async (data: any) => {
      if (!img_url) {
        message.error('请上传封面图片！');
        return;
      }

      const { desc, type } = data;

      const params: API.artParams = {
        title: curtitle,
        content: value,
        type,
        user_id: localStorage.STARRY_STAR_SKY_ID || 0,
        img_url,
        desc,
      };

      const response: any = await dispatch({
        type: 'article/createArticle',
        payload: params,
      });

      if (response?.success) {
        // setPubVis(true);
        // form.resetFields();
        // setImg_url('');
        // setCurtitle('');
        // setValue('');
      }
    });
  };

  const getBase64 = (img: any, callback: any) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
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
            placeholder="输入文章内容..."
            uploadImages={(files: any): any => {
              getBase64(files[0], (imageUrl: any) => {
                // 继续使用上文的file
                const formDate = new FormData();
                formDate.append('file', files[0], files[0].name);
                upLoadFiles(formDate).then((res) => {
                  if (res.code === 0) {
                    const { data } = res;
                    const defineUrl =
                      value + `![${data.originalname}](${data.path})`;
                    setValue(defineUrl);
                  }
                });
              });
            }}
            onChange={(v) => {
              setValue(v);
            }}
          />
        </div>
      </Card>
    </div>
  );
};

export default WriteArt;
