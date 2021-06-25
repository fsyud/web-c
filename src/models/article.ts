import { Effect, Reducer } from 'umi';
import { getHomeList } from '@/service/home';

export type CuurrentArt = {};
export interface ArticleModelType {
  namespace: 'article';
  state: {
    list: Array<any>;
  };
  effects: {
    fetchArticle: Effect;
  };
  reducers: {
    saveCurrentArticleList: Reducer<any>;
  };
}

const ArticleModel: ArticleModelType = {
  namespace: 'article',
  state: {
    list: [],
  },
  effects: {
    *fetchArticle(_, { call, put }) {
      const response = yield call(getHomeList);

      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },
  reducers: {
    saveCurrentArticleList(state, action) {
      return {
        ...state,
        list: action.payload || [],
      };
    },
  },
};

export default ArticleModel;
