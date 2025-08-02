import axios from 'axios';

const API_URL = 'https://app1-8-eqwt.onrender.com/api/payrolls';

export const createPayroll = (data) => axios.post(API_URL, data);
export const getPayrolls = () => axios.get(API_URL);
export const deletePayroll = (id) => axios.delete(`${API_URL}/${id}`);
