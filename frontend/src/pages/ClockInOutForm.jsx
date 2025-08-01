import React, { useState, useEffect } from 'react';
import { clockIn, clockOut } from '../services/clockinoutService';
import {
  TextField,
  Button,
  Typography,
  Grid,
  Paper
} from '@mui/material';
import EmployeeNavbar from '../components/EmployeeNavbar';

export default function ClockInOutForm() {
  // 👇 Get employeeId from localStorage
  const employeeId = localStorage.getItem("employeeId") || "";

  const [employeeName, setEmployeeName] = useState('');
  const [location, setLocation] = useState('');
  const [clockInTime, setClockInTime] = useState('');
  const [clockOutTime, setClockOutTime] = useState('');
  const [remarks, setRemarks] = useState('');

  const date = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

  // Get current IST time in HH:MM
  const getCurrentISTTime = () => {
    const ist = new Date(
      new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
    );
    const hours = String(ist.getHours()).padStart(2, '0');
    const minutes = String(ist.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // Get user location
  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = pos.coords;
          setLocation(`${coords.latitude},${coords.longitude}`);
        },
        (err) => {
          alert("Failed to get location. Please allow location access.");
          console.error(err);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const handleClockIn = async () => {
    const timeNow = getCurrentISTTime();

    if (!employeeId || !location || !timeNow) {
      alert("Missing required field: employee ID, location, or time");
      return;
    }

    const payload = {
      employeeId,
      employeeName,
      date,
      clockInTime: timeNow,
      location,
      remarks
    };

    console.log("Clock In Payload:", payload);

    try {
      await clockIn(payload);
      setClockInTime(timeNow);
      alert(`✅ Clocked in successfully at ${timeNow}`);
    } catch (err) {
      alert("❌ Already clocked in today " );
    }
  };

  const handleClockOut = async () => {
    const timeNow = getCurrentISTTime();

    if (!employeeId || !timeNow) {
      alert("Missing required field: employee ID or time");
      return;
    }

    const payload = {
      employeeId,
      date,
      clockOutTime: timeNow,
      remarks
    };

    console.log("Clock Out Payload:", payload);

    try {
      await clockOut(payload);
      setClockOutTime(timeNow);
      alert(`✅ Clocked out successfully at ${timeNow}`);
    } catch (err) {
      alert("❌ Clock-out failed: " + (err?.response?.data?.message || err.message));
    }
  };

  return (
    <>
      <EmployeeNavbar />
      <Paper elevation={3} sx={{ p: 4, maxWidth: 500, mx: 'auto', mt: 4 }}>
        <Typography variant="h5" gutterBottom align="center">
          Clock In / Clock Out
        </Typography>

        <Grid container spacing={2}>
          {/* Employee ID */}
            <Grid item xs={12} display={'flex'}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Employee ID:
              </Typography>
              <Typography variant="body1" marginLeft={1} marginTop={0.2}>{employeeId}</Typography>
            </Grid>


            <Grid item xs={12} display={'flex'}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Date:
              </Typography>
              <Typography variant="body1" marginLeft={1} marginTop={0.2}>{date}</Typography>
            </Grid>


          {!clockInTime && (
            <Grid item xs={12} display="flex" justifyContent="center">
              <Button
                variant="contained"
                onClick={handleClockIn}
                sx={{
                  backgroundColor: 'green',
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '0.75rem',
                  '&:hover': {
                    backgroundColor: 'darkgreen',
                  }
                }}
              >
                Clock In
              </Button>
            </Grid>

            
          )}
          <Grid item xs={10}>
            <TextField
              fullWidth
              label="Location (Lat, Long)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <Button variant="outlined" onClick={fetchLocation}>📍</Button>
          </Grid>


          {/* Clock In Time & Clock Out Button */}
          {clockInTime && (
            <>


              <Grid item xs={12} marginLeft={'25%'}>
              <Button
                variant="contained"
                onClick={handleClockOut}
                sx={{
                  backgroundColor: 'red',
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '0.75rem',
                  '&:hover': {
                    backgroundColor: 'red',

                  }
                }}
              >
                  Clock Out
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Paper>
    </>
  );
}

