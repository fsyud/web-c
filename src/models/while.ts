import { Reducer } from 'umi';

export interface whileModelType {
  namespace: string;
  state: {
    curIndex: number;
  };
  effects: {};
  reducers: {
    awhileIndex: Reducer<any>;
  };
}

const whileModel: whileModelType = {
  namespace: 'awhile',
  state: {
    curIndex: 999,
  },
  effects: {},
  reducers: {
    awhileIndex(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default whileModel;
