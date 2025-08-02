import axios from 'axios';

const API = 'https://app1-8-eqwt.onrender.com/api/settings';

export const getSettings = () => axios.get(API);
export const updateSettings = (data) => axios.put(API, data);
