import React, { useState, useEffect } from 'react';
import { Form, Card } from 'antd';
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
      <Card bordered={false}>暂无数据！</Card>
    </div>
  );
};

export default Article;
