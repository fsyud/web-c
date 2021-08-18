import { Effect, Reducer } from 'umi';

export interface GlobalModelState {
  namespace: string;
  state: {
    scroller: boolean;
  };
  effects: {};
  reducers: {
    getScroller: Reducer<any>;
  };
}

const globalModel: GlobalModelState = {
  namespace: 'global',
  state: {
    scroller: false,
  },
  effects: {},
  reducers: {
    getScroller(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default globalModel;
