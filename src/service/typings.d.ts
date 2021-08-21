declare namespace API {
  type userInfo = {
    name: string;
    password: string;
  };
  type updateUser = {
    username?: string;
    avator_url?: string;
    job?: string;
    company?: string;
    introduce?: string;
    id?: string;
  };
  type artParams = {
    title: string;
    content: string;
    type: number;
    author: string;
    img_url: any;
    desc: string;
  };
  type reponseData = {
    code: number;
    data: any[];
    message: string;
  };
}
