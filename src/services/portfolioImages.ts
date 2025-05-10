import axios from 'axios';
import {
  PortfolioImagesData,
  PortfolioImagesResponse,
} from '../types/PortfolioImages';
import api from './api';

const fetchPortfolioImages = async (): Promise<PortfolioImagesResponse> => {
  try {
    const response = await api.get<PortfolioImagesResponse>(
      '/portfolio/images'
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Sesi telah berakhir, silakan login kembali');
      }
      if (error.response?.status === 404) {
        throw new Error('Data portfolio tidak ditemukan');
      }
    }
    throw new Error('Terjadi kesalahan saat memuat data portfolio');
  }
};

export const deletePortfolioImage = async (id: string): Promise<void> => {
  try {
    await api.delete(`/portfolio/images/${id}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Sesi telah berakhir, silakan login kembali');
      }
      if (error.response?.status === 404) {
        throw new Error('Data portfolio tidak ditemukan');
      }
    }
    throw new Error('Terjadi kesalahan saat menghapus data portfolio');
  }
};

export const getPortfolioImageById = async (
  id: string
): Promise<PortfolioImagesData> => {
  try {
    const response = await api.get<PortfolioImagesData>(
      `/portfolio/images/${id}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Sesi telah berakhir, silakan login kembali');
      }
      if (error.response?.status === 404) {
        throw new Error('Data portfolio tidak ditemukan');
      }
    }
    throw new Error('Terjadi kesalahan saat memuat data portfolio');
  }
};

export const updatePortfolioImage = async (
  id: string,
  data: FormData
): Promise<void> => {
  try {
    await api.put(`/portfolio/images/${id}`, data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Sesi telah berakhir, silakan login kembali');
      }
      if (error.response?.status === 404) {
        throw new Error('Data portfolio tidak ditemukan');
      }
      if (error.response?.status === 400) {
        throw new Error('Data tidak valid');
      }
    }
    throw new Error('Terjadi kesalahan saat memperbarui data portfolio');
  }
};

export const addPortfolioImage = async (data: FormData): Promise<void> => {
  try {
    await api.post('/portfolio/images', data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Sesi telah berakhir, silakan login kembali');
      }
      if (error.response?.status === 400) {
        throw new Error('Data tidak valid');
      }
    }
    throw new Error('Terjadi kesalahan saat menambahkan data portfolio');
  }
};

export default fetchPortfolioImages;
