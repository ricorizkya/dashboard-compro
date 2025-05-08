import axios from 'axios';
import { UpdateUserPayload, UserData, UserResponse } from '../types/User';
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

export const getUserById = async (userId: string): Promise<UserData> => {
  try {
    const response = await api.get<UserData>(`/users/${userId}`);
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
): Promise<UserData> => {
  try {
    const response = await api.put<UserData>(`/users/${userId}`, data);
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

export const fetchUserData = async (): Promise<UserResponse> => {
  try {
    const response = await api.get<UserResponse>('/users');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Sesi telah berakhir, silakan login kembali');
      }
      if (error.response?.status === 404) {
        throw new Error('Data user tidak ditemukan');
      }
    }
    throw new Error('Terjadi kesalahan saat memuat data user');
  }
};

export const deleteUserData = async (id: string): Promise<void> => {
  try {
    await api.delete(`/users/${id}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Sesi telah berakhir, silakan login kembali');
      }
      if (error.response?.status === 404) {
        throw new Error('Data user tidak ditemukan');
      }
    }
    throw new Error('Terjadi kesalahan saat menghapus data user');
  }
};

export const addUserData = async (data: FormData): Promise<void> => {
  try {
    await api.post('/users', data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Sesi telah berakhir, silakan login kembali');
      }
      if (error.response?.status === 400) {
        throw new Error('Data tidak valid');
      }
    }
    throw new Error('Terjadi kesalahan saat menambahkan data user');
  }
};
