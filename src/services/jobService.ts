import axios from 'axios';
import { Job } from '../context/JobContext';
const url = import.meta.env.VITE_API_BASE_URL;

const API_URL = url;

// Set up axios interceptor for token
const setupAuthHeader = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export const getAllJobs = async (token: string): Promise<Job[]> => {
  try {
    const response = await axios.get(
      `${API_URL}/jobs`,
      setupAuthHeader(token)
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch jobs');
    }
    throw new Error('Network error. Please try again.');
  }
};

export const getJobById = async (id: string, token: string): Promise<Job> => {
  try {
    const response = await axios.get(
      `${API_URL}/jobs/${id}`,
      setupAuthHeader(token)
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch job');
    }
    throw new Error('Network error. Please try again.');
  }
};

export const addJob = async (
  jobData: Omit<Job, 'id' | 'postedDate'>,
  token: string
): Promise<Job> => {
  try {
    const response = await axios.post(
      `${API_URL}/jobs`,
      jobData,
      setupAuthHeader(token)
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to add job');
    }
    throw new Error('Network error. Please try again.');
  }
};

export const deleteJob = async (
  jobId: Omit<Job, 'id' | 'postedDate'>,
  token: string
): Promise<{ message: string }> => {
  try {
    const response = await axios.delete(
      `${API_URL}/jobs/${jobId}`,
      setupAuthHeader(token)
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to delete job');
    }
    throw new Error('Network error. Please try again.');
  }
};
