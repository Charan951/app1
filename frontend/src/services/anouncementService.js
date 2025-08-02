import axios from 'axios';
const API_URL = 'https://app1-8-eqwt.onrender.com/api/anouncement';

export const getEmployees = () => axios.get(API_URL);
export const addEmployee = (data) => axios.post(API_URL, data);
export const deleteEmployee = (id) => axios.delete(`${API_URL}/${id}`);
