// services/product.ts
import axios from 'axios';
import { ProductData, ProductResponse } from '../types/Product';
import api from './api';

const fetchProductData = async (): Promise<ProductResponse> => {
  try {
    const response = await api.get<ProductResponse>('/products');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Sesi telah berakhir, silakan login kembali');
      }
      if (error.response?.status === 404) {
        throw new Error('Data product tidak ditemukan');
      }
    }
    throw new Error('Terjadi kesalahan saat memuat data product');
  }
};

export const deleteProductData = async (id: string): Promise<void> => {
  try {
    await api.delete(`/products/${id}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Sesi telah berakhir, silakan login kembali');
      }
      if (error.response?.status === 404) {
        throw new Error('Data product tidak ditemukan');
      }
    }
    throw new Error('Terjadi kesalahan saat menghapus data product');
  }
};

export const getProductById = async (id: string): Promise<ProductData> => {
  try {
    const response = await api.get<ProductData>(`/products/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Sesi telah berakhir, silakan login kembali');
      }
      if (error.response?.status === 404) {
        throw new Error('Data product tidak ditemukan');
      }
    }
    throw new Error('Terjadi kesalahan saat memuat data product');
  }
};

export const updateProductData = async (
  id: string,
  data: FormData
): Promise<void> => {
  try {
    await api.put(`/products/${id}`, data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Sesi telah berakhir, silakan login kembali');
      }
      if (error.response?.status === 404) {
        throw new Error('Data product tidak ditemukan');
      }
    }
    throw new Error('Terjadi kesalahan saat memperbarui data product');
  }
};

export const addProductData = async (data: FormData): Promise<void> => {
  try {
    await api.post('/products', data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Sesi telah berakhir, silakan login kembali');
      }
      if (error.response?.status === 400) {
        throw new Error('Data tidak valid');
      }
    }
    throw new Error('Terjadi kesalahan saat menambahkan data product');
  }
};

export default fetchProductData;
