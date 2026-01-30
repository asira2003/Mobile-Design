export type Post = {
  id: string;
  video_url: string;
  title: string;
  description: string;
  type: string;
};

export interface User {
  id: number;
  email: string;
  password: string;
}

export interface AuthUser {
  id: number;
  email: string;
}

export interface UsersData {
  users: User[];
}

export interface LoginResult {
  success: boolean;
  message?: string;
}
