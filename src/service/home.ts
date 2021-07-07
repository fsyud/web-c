import request from '@/utils/request';

export type homeListParamsType = {
  page?: number;
  pageSize?: number;
};

export type createArtParamsType = {};

export type getArtDeatilParamsType = {
  id?: number | string;
  tag?: number | string;
};

// 获取文章列表
export async function getArticleList(params: homeListParamsType) {
  return request('/api/home/list', {
    method: 'POST',
    data: params,
  });
}

// 写文章
export async function createArticle(params: createArtParamsType) {
  return request('/api/home/create', {
    method: 'PUT',
    data: params,
  });
}

// 获取文章详情
export async function getArtDeatil(params: getArtDeatilParamsType) {
  return request('/api/home/detail', {
    method: 'GET',
    params: {
      id: params.id,
    },
  });
}
