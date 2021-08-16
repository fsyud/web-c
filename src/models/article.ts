import { Effect, Reducer } from 'umi';
import { message } from 'antd';
import { createArticle, getArtDeatil } from '@/service/home';

export type CuurrentArt = {};
export interface ArticleModelType {
  namespace: 'article';
  state: {
    list: Array<any>;
    detail: object;
  };
  effects: {
    createArticle: Effect;
    getArticleDetail: Effect;
  };
  reducers: {
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
    *createArticle({ payload }, { call, _ }) {
      const { data } = yield call(createArticle, payload);
      if (data) {
        message.info(data.msg);
      }
      return data;
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
    artList(state, action) {
      return {
        ...state,
        detail: action.payload,
      };
    },
  },
};

export default ArticleModel;
