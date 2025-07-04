export interface IPost {
  id: string;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPostsResponse {
  posts: IPost[];
}
