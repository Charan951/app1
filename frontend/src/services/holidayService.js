import axios from 'axios';
const API  = 'https://app1-8-eqwt.onrender.com/api/holidays';

export const createHoliday = (data) => axios.post(API, data);
export const getHolidays = () => axios.get(API);
export const deleteHoliday = (id) => axios.delete(`${API}/${id}`);
