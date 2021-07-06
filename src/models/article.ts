import { Effect, Reducer } from 'umi';
import { message } from 'antd';
import { getHomeList, createArticle, getArtDeatil } from '@/service/home';

export type CuurrentArt = {};
export interface ArticleModelType {
  namespace: 'article';
  state: {
    list: Array<any>;
    detail: object;
  };
  effects: {
    fetchArticle: Effect;
    createArticle: Effect;
    getArticleDetail: Effect;
  };
  reducers: {
    saveCurrentArticleList: Reducer<any>;
    artList: Reducer<any>;
  };
}

const ArticleModel: ArticleModelType = {
  namespace: 'article',
  state: {
    list: [],
    detail: {},
  },
  effects: {
    *fetchArticle(_, { call, put }) {
      const response = yield call(getHomeList);
      if (response) {
        yield put({
          type: 'saveCurrentArticleList',
          payload: response.data || [],
        });
      }
    },
    *createArticle({ payload }, { call, _ }) {
      const { data } = yield call(createArticle, payload);
      if (data) {
        message.info(data.msg);
      }
    },
    *getArticleDetail({ payload }, { call, put }) {
      const response = yield call(getArtDeatil, payload);
      if (response) {
        yield put({
          type: 'artList',
          payload: response.data || {},
        });
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
    artList(state, action) {
      return {
        ...state,
        detail: action.payload,
      };
    },
  },
};

export default ArticleModel;
