import axios from 'axios';
import { CarouselData, CarouselResponse } from '../types/Carousel';
import api from './api';

export const fetchCarouselData = async (): Promise<CarouselResponse> => {
  try {
    const response = await api.get<CarouselResponse>('/carousel');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Sesi telah berakhir, silakan login kembali');
      }
      if (error.response?.status === 404) {
        throw new Error('Data carousel tidak ditemukan');
      }
    }
    throw new Error('Terjadi kesalahan saat memuat data carousel');
  }
};

export const deleteCarouselData = async (id: string): Promise<void> => {
  try {
    await api.delete(`/carousel/${id}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Sesi telah berakhir, silakan login kembali');
      }
      if (error.response?.status === 404) {
        throw new Error('Data carousel tidak ditemukan');
      }
    }
    throw new Error('Terjadi kesalahan saat menghapus data carousel');
  }
};

export const getCarouselById = async (id: string): Promise<CarouselData> => {
  try {
    const response = await api.get<CarouselData>(`/carousel/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Sesi telah berakhir, silakan login kembali');
      }
      if (error.response?.status === 404) {
        throw new Error('Data carousel tidak ditemukan');
      }
    }
    throw new Error('Terjadi kesalahan saat memuat data carousel');
  }
};

export const updateCarouselData = async (
  id: string,
  data: FormData
): Promise<void> => {
  try {
    await api.put(`/carousel/${id}`, data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Sesi telah berakhir, silakan login kembali');
      }
      if (error.response?.status === 404) {
        throw new Error('Data carousel tidak ditemukan');
      }
    }
    throw new Error('Terjadi kesalahan saat memperbarui data carousel');
  }
};

export const addCarouselData = async (data: FormData): Promise<void> => {
  try {
    await api.post('/carousel', data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Sesi telah berakhir, silakan login kembali');
      }
      if (error.response?.status === 400) {
        throw new Error('Data tidak valid');
      }
    }
    throw new Error('Terjadi kesalahan saat menambahkan data carousel');
  }
};
