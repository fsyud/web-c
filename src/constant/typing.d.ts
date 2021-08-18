declare namespace GLOBAL {
  interface tyoeArrType {
    v: number;
    n: string;
  }
  type tagType = {
    type: number;
    name: string;
    children?: {
      type: number;
      name: string;
      parents: number;
      icon?: any;
    }[];
  };
}
