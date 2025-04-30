import axios from 'axios';
import api from './api';

interface LoginResponse {
  expires: string;
  token: string;
}

export const login = async (credentials: {
  username: string;
  password: string;
}) => {
  try {
    const response = await api.post<LoginResponse>('/login', credentials);

    if (!response.data.token) {
      throw new Error('Token tidak ditemukan dalam respons');
    }

    localStorage.setItem('token', response.data.token);
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
    // Ambil token sebelum dihapus
    const token = localStorage.getItem('authToken');
    console.log('Token before logout:', token);

    // Hapus token dari storage terlebih dahulu
    localStorage.removeItem('authToken');
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
