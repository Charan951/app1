import axios from 'axios';

const API_URL = 'http://localhost:5000/api/payslips';

// Get all payslips
export const getPayslips = () => axios.get(`${API_URL}/get`);

// Create a new payslip
export const createPayslip = (payslipData) => axios.post(`${API_URL}/create`, payslipData);

// Get payslips for a specific employee
export const getPayslipsByEmployee = (employeeId) => axios.get(`${API_URL}/${employeeId}`);