export interface IProductFilterUpdate {
  _id: string
  countInStock: number;
  discount: {
    name: string;
  };
  createdAt: number;
  order: number;
  viewCount: number;
}