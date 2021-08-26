import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Input, message, Form } from 'antd';
import classnames from 'classnames';
import { useDispatch } from 'dva';
import { getArtDeatil } from '@/service/home';
import { history } from 'umi';
import { Editor, Viewer } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import gemoji from '@bytemd/plugin-gemoji';
import math from '@bytemd/plugin-math';
import footnotes from '@bytemd/plugin-footnotes';
import { upLoadFiles } from '@/service/common';
import PublishForm from '@/components/Article/PublishForm';
import { insertText } from '@/utils/utils';
import { StorageStore } from '@/utils/authority';
import 'bytemd/dist/index.min.css';
import styles from './index.less';
import './index.css';

const plugins = [
  gfm(),
  gemoji(),
  highlight(),
  math(),
  footnotes(),
  // Add more plugins here
];

interface Position {
  ch: number;
  line: number;
  sticky?: string;
}

interface MouseSelectionConfiguration {
  unit?:
    | 'char'
    | 'word'
    | 'line'
    | 'rectangle'
    | ((
        cm: CodeMirror.Editor,
        pos: Position,
      ) => { from: Position; to: Position });

  extend?: boolean;
  addNew?: boolean;
  moveOnDrag?: boolean;
}

interface Position {
  ch: number;
  line: number;
  sticky?: string;
}

const WriteArt: React.FC<{}> = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [curtitle, setCurtitle] = useState<string>('');
  const [pubVis, setPubVis] = useState<boolean>(true);
  const [img_url, setImg_url] = useState<any>();
  const [value, setValue] = useState<string>('');
  const [defImgUrl, setDefImgUrl] = useState<string>('');
  const [detailInfo, setDetailInfo] = useState<any>();

  const {
    location: { query },
  } = history;

  useEffect(() => {
    document.addEventListener('click', (e: any) => {
      if (e.target.nodeName !== 'INPUT') {
        setPubVis(true);
      }
    });
    // 文章编辑
    if (query?.id) {
      getArtDetail(query.id);
    }
  }, []);

  const getArtDetail = async (pmrams: any): Promise<any> => {
    const { data } = await getArtDeatil({ id: pmrams });
    if (data) {
      setDetailInfo(data);
      setCurtitle(data.title);
      setValue(data.content);
      form.setFieldsValue({
        type: Number(data.type),
        desc: data.desc,
      });
      setDefImgUrl(data.img_url);
    }
  };

  const submit = async (): Promise<any> => {
    if (!curtitle) {
      message.error('请填写标题！');
      return;
    }

    if (!value) {
      message.error('内容不能为空！');
      return;
    }

    form.validateFields().then(async (data: any) => {
      if (query?.id) {
        if (!img_url && !defImgUrl) {
          message.error('请上传封面图片！');
        }
      } else {
        if (!img_url) {
          message.error('请上传封面图片！');
          return;
        }
      }

      const { desc, type } = data;

      let params: API.artParams = {
        title: curtitle,
        content: value,
        type,
        user_id: StorageStore.getUserId() || 0,
        desc,
      };

      let typeReaquestUrl: string = '';

      if (img_url) {
        params.img_url = img_url;
      } else {
        params.img_url = defImgUrl;
      }

      if (query?.id) {
        params._id = detailInfo._id;
        typeReaquestUrl = 'article/updateArticle';
      } else {
        typeReaquestUrl = 'article/createArticle';
      }

      const response: any = await dispatch({
        type: typeReaquestUrl,
        payload: params,
      });

      if (response?.success) {
        setPubVis(true);
        form.resetFields();
        setImg_url('');
        setCurtitle('');
        setValue('');
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
                defaultImgUrl={defImgUrl}
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
            editorConfig={{
              configureMouse: (
                cm: CodeMirror.Editor,
              ): MouseSelectionConfiguration => {
                // console.log(cm.getCursor('from'));
                return { unit: 'rectangle' };
              },
            }}
            placeholder="输入文章内容..."
            uploadImages={(files: any): any => {
              getBase64(files[0], (imageUrl: any) => {
                // 继续使用上文的file
                const formDate = new FormData();
                formDate.append('file', files[0], files[0].name);
                upLoadFiles(formDate).then((res) => {
                  if (res.code === 0) {
                    console.log(value);
                    const { data } = res;
                    const defineUrl =
                      value + `![${data.originalname}](${data.path})`;
                    // insertText(value, `![${data.originalname}](${data.path})`)
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
