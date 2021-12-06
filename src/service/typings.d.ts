declare namespace API {
  type userInfo = {
    name: string;
    password: string;
    type?: string;
  };
  type updateUser = {
    username?: string;
    avatar_url?: string;
    job?: string;
    company?: string;
    introduce?: string;
    id?: string;
  };
  type artParams = {
    title: string;
    content: string;
    type: number;
    author?: string;
    user_id: string;
    img_url?: any;
    desc: string;
    _id?: string;
  };
  type reponseData = {
    code: number;
    data: any[];
    message: string;
  };
  type ItemParms = {
    _id?: string;
    title: string; // 项目标题
    desc: string;
    img_url: string; // 项目封面图片
  };
}
