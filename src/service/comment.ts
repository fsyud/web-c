import request from '@/utils/request';

export type commentParamsType = {
  article_id: string;
  user_id: string;
  content: string;
};

// 发表一级评论
export async function addOneComment(params: commentParamsType) {
  return request('/api/comment/addOne', {
    method: 'POST',
    data: params,
  });
}
