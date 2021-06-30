import request from '@/utils/request';

export type homeListParamsType = {};

export type createArtParamsType = {};

// 获取文章列表
export async function getHomeList(params: homeListParamsType) {
  return request('/api/home/list', {
    method: 'GET',
  });
}

// 写文章
export async function createArticle(params: createArtParamsType) {
  return request('/api/home/create', {
    method: 'PUT',
    data: params,
  });
}
