export interface UserData {
  id: string;
  name: string;
  phone: string;
  role: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateUserPayload {
  name: string;
  phone: string;
  password?: string;
}

export interface UserResponse {
  data: UserData[];
  meta: {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
  };
}
