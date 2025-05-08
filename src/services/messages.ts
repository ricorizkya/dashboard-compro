import axios from 'axios';
import { MessageData, MessagesResponse } from '../types/Messages';
import api from './api';

export const fetchMessages = async (): Promise<MessagesResponse> => {
  try {
    const response = await api.get<MessagesResponse>('/messages');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Sesi telah berakhir, silakan login kembali');
      }
      if (error.response?.status === 404) {
        throw new Error('Data messages tidak ditemukan');
      }
    }
    throw new Error('Terjadi kesalahan saat memuat data messages');
  }
};

export const getMessagesById = async (id: string): Promise<MessageData> => {
  try {
    const response = await api.get<MessageData>(`/messages/${id}`);
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
