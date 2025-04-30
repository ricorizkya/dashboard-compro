import axios from 'axios';
import api from './api';

interface LoginResponse {
  expires: string;
  token: string;
  user: {
    id: number;
    name: string;
    role: string;
    username: string;
  };
}

export const login = async (credentials: {
  username: string;
  password: string;
}) => {
  try {
    const response = await api.post<LoginResponse>('/login', credentials);
    console.log('Login response:', response.data);
    if (!response.data.token) {
      throw new Error('Token tidak ditemukan dalam respons');
    }

    localStorage.setItem('token', response.data.token);
    localStorage.setItem('idUser', response.data.user.id.toString());
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          'Login gagal. Periksa kembali username dan password Anda'
      );
    }
    throw new Error('Terjadi kesalahan pada sistem');
  }
};

export const logout = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log('Token before logout:', token);

    localStorage.removeItem('token');
    localStorage.removeItem('idUser');
    sessionStorage.clear();

    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
