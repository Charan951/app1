import axios from 'axios';

const API_URL = 'https://app1-8-eqwt.onrender.com/api/feedbacks';

axios.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
);

export const submitFeedback = (data) => axios.post(API_URL, data);
export const getAllFeedbacks = () => axios.get(API_URL);
export const respondToFeedback = (id, data) => axios.put(`${API_URL}/${id}`, data);