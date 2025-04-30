export interface User {
  id: number;
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
