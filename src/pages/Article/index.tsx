import React, { useState } from 'react';
import { Form, Card } from 'antd';
import { ConnectProps } from 'umi';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import styles from './index.less';

const FormItem = Form.Item;

interface ArticleProps {
  dispatch: ConnectProps<any>;
}
interface FormDataType {
  tag_ids: (string | number)[];
}

const tyoeArr = [
  { v: 1, n: '全部' },
  { v: 2, n: 'java' },
  { v: 3, n: '前端' },
  { v: 4, n: '后端' },
  { v: 5, n: '工具' },
  { v: 6, n: 'mac' },
  { v: 7, n: '算法' },
  { v: 8, n: 'git' },
  { v: 9, n: 'mysql' },
  { v: 10, n: 'react' },
];

const Article: React.FC<ArticleProps> = (props) => {
  const [formData, setFormData] = useState<FormDataType>({
    tag_ids: [1],
  });

  const [form] = Form.useForm();
  return (
    <div className={styles.article_main}>
      <Card bordered={false}>
        <Form
          form={form}
          layout="inline"
          initialValues={{ initialValue: formData }}
          onValuesChange={(changedValues, { initialValue, ...values }) => {
            setFormData(values as FormDataType);
          }}
        >
          <StandardFormRow title="所属标签" block style={{ paddingBottom: 11 }}>
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
      <Card bordered={false}>
        因服务器搬迁原因！博客升级中，给您带来不便请谅解！✨✨
      </Card>
    </div>
  );
};

export default Article;
