import axios from 'axios';

const API_URL = 'https://app1-8-eqwt.onrender.com/api/notices';

export const getNotices = () => axios.get(API_URL);
export const createNotice = (data) => axios.post(API_URL, data);
export const deleteNotice = (id) => axios.delete(`${API_URL}/${id}`);
