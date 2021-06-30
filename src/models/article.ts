import { Effect, Reducer } from 'umi';
import { message } from 'antd';
import { getHomeList, createArticle } from '@/service/home';

export type CuurrentArt = {};
export interface ArticleModelType {
  namespace: 'article';
  state: {
    list: Array<any>;
  };
  effects: {
    fetchArticle: Effect;
    createArticle: Effect;
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
        type: 'saveCurrentArticleList',
        payload: response,
      });
    },
    *createArticle({ payload }, { call, put }) {
      const response = yield call(createArticle, payload);
      // console.log(response);
      if (response) {
        message.info(response.msg);
      }
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
