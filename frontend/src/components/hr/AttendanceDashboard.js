import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  CircularProgress,
  Link
} from '@mui/material';
import HRNavbar from './HRNavbar';
import HRSidebar from './HRSidebar';

export default function AttendanceTable() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/attendance');
      setAttendanceData(response.data);
    } catch (error) {
      console.error('Failed to fetch attendance data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Helper to create Google Maps URL
  const getGoogleMapsLink = (location) => {
    const encodedLocation = encodeURIComponent(location);
    return `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
  };

  return (
    <>
      <HRNavbar />
      <Box sx={{ display: 'flex' }}>
        {/* Sidebar on the left */}
        <Box sx={{ width: '240px', flexShrink: 0 }}>
          <HRSidebar />
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: '#f5f5f5',
            minHeight: '100vh',
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom>
              Attendance Records
            </Typography>

            {loading ? (
              <CircularProgress />
            ) : (
              <Paper elevation={3} sx={{ overflowX: 'auto' }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#1976d2' }}>
                      <TableCell sx={{ color: '#fff' }}><b>Employee ID</b></TableCell>
                      <TableCell sx={{ color: '#fff' }}><b>Date</b></TableCell>
                      <TableCell sx={{ color: '#fff' }}><b>Clock In</b></TableCell>
                      <TableCell sx={{ color: '#fff' }}><b>Clock Out</b></TableCell>
                      <TableCell sx={{ color: '#fff' }}><b>Location</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {attendanceData.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell>{record.employeeId}</TableCell>
                        <TableCell>{record.date}</TableCell>
                        <TableCell>{record.clockInTime || '-'}</TableCell>
                        <TableCell>{record.clockOutTime || '-'}</TableCell>
                        <TableCell>
                          {record.location ? (
                            <Link
                              href={getGoogleMapsLink(record.location)}
                              target="_blank"
                              rel="noopener"
                              underline="hover"
                              color="primary"
                            >
                              {record.location}
                            </Link>
                          ) : (
                            '-'
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            )}
          </Container>
        </Box>
      </Box>
    </>
  );
}
