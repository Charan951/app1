import axios from 'axios';

const BASE_URL = 'https://app1-8-eqwt.onrender.com/api/attendance';

// Clock In
export const clockIn = async ({ employeeId, date, clockInTime, location }) => {
  return await axios.post(`${BASE_URL}/clockin`, {
    employeeId,
    date,
    clockInTime,
    location,
  });
};

// Clock Out
export const clockOut = async ({ employeeId, date, clockOutTime }) => {
  return await axios.post(`${BASE_URL}/clockout`, {
    employeeId,
    date,
    clockOutTime,
  });
};

// Get All Attendance Records
export const getAllAttendance = async () => {
  return await axios.get(`${BASE_URL}`);
};


