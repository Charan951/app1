import axios from 'axios';

const BASE_URL = 'https://app1-8-eqwt.onrender.com/api/settings';

export const getSettings = () => axios.get(BASE_URL);
export const saveSettings = (data) => axios.post(BASE_URL, data);
