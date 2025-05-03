import axios from 'axios';
const url = import.meta.env.VITE_API_BASE_URL;

const API_URL = url;

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Authentication failed');
    }
    throw new Error('Authentication failed. Please try again.');
  }
};