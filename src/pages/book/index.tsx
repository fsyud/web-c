import React, { useState, useEffect } from 'react';
import { Form, Card, Tag } from 'antd';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import { tyoeArr } from '@/constant';
import styles from './index.less';

const FormItem = Form.Item;

interface ArticleProps {}
interface FormDataType {
  tag_ids: (string | number)[];
}

const Article: React.FC<ArticleProps> = (props) => {
  const [formData, setFormData] = useState<FormDataType>({
    tag_ids: [1],
  });

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const [form] = Form.useForm();
  return (
    <div className={styles.article_main}>
      <Card bordered={false}>
        <Form
          form={form}
          layout="inline"
          initialValues={{ initialValue: formData }}
          onValuesChange={(changedValues, _) => {
            setFormData(changedValues);
          }}
        >
          <StandardFormRow title="" block style={{ paddingBottom: 11 }}>
            <FormItem name="category">
              <TagSelect expandable>
                {tyoeArr?.map((tag) => (
                  // @ts-ignore
                  <TagSelect.Option value={tag.v} key={tag.v}>
                    {tag.n}
                  </TagSelect.Option>
                ))}
              </TagSelect>
            </FormItem>
          </StandardFormRow>
        </Form>
      </Card>

      <div className={styles.content}>
        <div className={styles.one_book}>
          <img src={require('@/assets/book.jpg')} alt="" />
          <div>
            <h3>Node + React 实战：从 0 到 1 实现记账本</h3>
            <div>
              <Tag color="geekblue">前端</Tag>
              <Tag color="purple">算法</Tag>
            </div>
          </div>
        </div>
        <div className={styles.one_book}>
          <img src={require('@/assets/book.jpg')} alt="" />
          <div>
            <h3>Node + React 实战：从 0 到 1 实现记账本</h3>
            <div>
              <Tag color="magenta">前端</Tag>
              <Tag color="red">算法</Tag>
            </div>
          </div>
        </div>
        <div className={styles.one_book}>
          <img src={require('@/assets/book.jpg')} alt="" />
          <div>
            <h3>Node + React 实战：从 0 到 1 实现记账本</h3>
            <div>
              <Tag color="magenta">前端</Tag>
              <Tag color="red">算法</Tag>
            </div>
          </div>
        </div>
        <div className={styles.one_book}>
          <img src={require('@/assets/book.jpg')} alt="" />
          <div>
            <h3>Node + React 实战：从 0 到 1 实现记账本</h3>
            <div>
              <Tag color="magenta">前端</Tag>
              <Tag color="red">算法</Tag>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
