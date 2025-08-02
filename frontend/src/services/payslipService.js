import axios from 'axios';

const API_URL = 'https://app1-8-eqwt.onrender.com/api/payslips';

// Get all payslips
export const getPayslips = () => axios.get(`${API_URL}/get`);

// Create a new payslip
export const createPayslip = (payslipData) => axios.post(`${API_URL}/create`, payslipData);

// Get payslips for a specific employee
export const getPayslipsByEmployee = (employeeId) => axios.get(`${API_URL}/${employeeId}`);