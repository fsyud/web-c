import { Effect } from 'umi';
import { GlobalModelState } from './global';

export interface ArticleModelType {
  namespace: 'article';
  state: GlobalModelState;
  effects: {
    fetchArticle: Effect;
  };
}

const ArticleModel: ArticleModelType = {
  namespace: 'article',
  state: {
    collapsed: false,
  },
  effects: {
    *fetchArticle({ payload }) {
      console.log(payload);
    },
  },
};

export default ArticleModel;
