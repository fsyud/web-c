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
}
