export interface IPost {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  coverImageUrl: string;
  likeCount: number;
  commentCount: number;
  createdBy: string;
  user: {
    id: number;
    username: string;
    email: string;
    profilePictureUrl: string;
  };
}
