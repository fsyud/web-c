import request from '@/utils/request';

export type awhileParamsType = {
  tag?: string | number;
  user_id: string;
  content?: string;
  picture_url?: string[];
  links?: string;
};

// 获取时刻列表
export async function getAwhileList(params: {
  tag?: string | number;
  page?: number;
  pageSize?: number;
}) {
  return request('/api/awhile/list', {
    method: 'POST',
    data: params,
  });
}

// 添加一级时刻
export async function addOneAwhile(params: awhileParamsType) {
  return request('/api/awhile/addOne', {
    method: 'POST',
    data: params,
  });
}

// 添加二级时刻评论
export async function addTwoAwhile(params: awhileParamsType) {
  return request('/api/awhile/addTwo', {
    method: 'POST',
    data: params,
  });
}

// 获取热门时刻
export async function getHotAwhile() {
  return request('/api/awhile/hot', {
    method: 'POST',
  });
}
