import { Reducer } from 'umi';

export interface whileModelType {
  namespace: string;
  state: {
    curIndex: number;
    isRefresh: boolean;
  };
  effects: {};
  reducers: {
    awhileIndex: Reducer<any>;
    IsRefresh: Reducer<any>;
  };
}

const whileModel: whileModelType = {
  namespace: 'awhile',
  state: {
    curIndex: 999,
    isRefresh: false,
  },
  effects: {},
  reducers: {
    awhileIndex(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    IsRefresh(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default whileModel;
