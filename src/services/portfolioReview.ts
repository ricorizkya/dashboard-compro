import axios from 'axios';
import api from './api';
import {
  PortfolioReviewResponse,
  PortfolioReviewsData,
} from '../types/PortfolioReviews';

export const fetchPortfolioReview =
  async (): Promise<PortfolioReviewResponse> => {
    try {
      const response = await api.get<PortfolioReviewResponse>(
        '/portfolio/reviews'
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

export const deletePortfolioReview = async (id: string): Promise<void> => {
  try {
    await api.delete(`/portfolio/reviews/${id}`);
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

export const getPortfolioReviewById = async (
  id: string
): Promise<PortfolioReviewsData> => {
  try {
    const response = await api.get<PortfolioReviewsData>(
      `/portfolio/reviews/${id}`
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

export const updatePortfolioReview = async (
  id: string,
  data: FormData
): Promise<void> => {
  try {
    await api.put(`/portfolio/reviews/${id}`, data);
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

export const addPortfolioReview = async (data: FormData): Promise<void> => {
  try {
    await api.post('/portfolio/reviews', data);
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
