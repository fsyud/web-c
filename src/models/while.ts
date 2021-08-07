import { Effect, Reducer } from 'umi';
import { message } from 'antd';

export interface whileModelType {
  namespace: string;
  state: {
    curIndex: number;
  };
  effects: {};
  reducers: {
    artList: Reducer<any>;
  };
}

const whileModel: whileModelType = {
  namespace: 'while',
  state: {
    curIndex: 1,
  },
  effects: {},
  reducers: {
    artList(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default whileModel;
