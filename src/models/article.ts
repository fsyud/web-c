import { Effect, Reducer } from 'umi';
import { message } from 'antd';
import { createArticle, getArtDeatil } from '@/service/home';
import { getCommentList } from '@/service/comment';

export type CuurrentArt = {};
export interface ArticleModelType {
  namespace: 'article';
  state: {
    list: Array<any>;
    detail: object;
    commentsList: Array<any>;
  };
  effects: {
    createArticle: Effect;
    getArticleDetail: Effect;
    getComments: Effect;
  };
  reducers: {
    artList: Reducer<any>;
    commentsList: Reducer<any>;
  };
}

const ArticleModel: ArticleModelType = {
  namespace: 'article',
  state: {
    list: [],
    detail: {},
    commentsList: [],
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
    *getComments({ payload }, { call, put }) {
      const response = yield call(getCommentList, payload);

      console.log(response);

      if (response) {
        yield put({
          type: 'commentsList',
          payload: response.data || {},
        });
      }
    },
  },
  reducers: {
    artList(state, { payload }) {
      return {
        ...state,
        detail: payload,
      };
    },
    commentsList(state, { payload }) {
      return {
        ...state,
        commentsList: payload,
      };
    },
  },
};

export default ArticleModel;
