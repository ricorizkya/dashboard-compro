import axios from 'axios';
import { UpdateUserPayload, User } from '../types/User';
import api from './api';

export const handleUserError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    switch (error.response?.status) {
      case 400:
        return 'Request tidak valid';
      case 401:
        return 'Autentikasi gagal';
      case 403:
        return 'Akses ditolak';
      case 404:
        return 'User tidak ditemukan';
      default:
        return 'Server error';
    }
  }
  return 'Terjadi kesalahan jaringan';
};

export const getUserById = async (userId: string): Promise<User> => {
  try {
    const response = await api.get<User>(`/users/${userId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Sesi telah berakhir, silahkan login kembali');
      }
      if (error.response?.status === 404) {
        throw new Error('User tidak ditemukan');
      }
    }
    throw new Error('Terjadi kesalahan pada sistem');
  }
};

export const updateUser = async (
  userId: string,
  data: UpdateUserPayload
): Promise<User> => {
  try {
    const response = await api.put<User>(`/users/${userId}`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Sesi telah berakhir, silahkan login kembali');
      }
      if (error.response?.status === 404) {
        throw new Error('User tidak ditemukan');
      }
    }
    throw new Error('Terjadi kesalahan pada sistem');
  }
};
