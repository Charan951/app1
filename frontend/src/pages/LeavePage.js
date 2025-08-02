import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  CircularProgress,
  Alert,
  Select,
  MenuItem,
  FormControl,
  Box,
} from '@mui/material';
import HRNavbar from '../components/hr/HRNavbar';
import HRSidebar from '../components/hr/HRSidebar';

export default function LeaveTable() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLeaveData();
  }, []);

  const fetchLeaveData = async () => {
    try {
      const response = await axios.get('https://app1-8-eqwt.onrender.com/api/leave/get');
      setLeaves(response.data);
    } catch (err) {
      console.error('Error fetching leave data:', err);
      setError('Failed to load leave records.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/leave/${id}/status`, {
        status: newStatus,
      });

      // Update state locally
      setLeaves((prev) =>
        prev.map((leave) =>
          leave.id === id ? { ...leave, status: newStatus } : leave
        )
      );
    } catch (error) {
      console.error('Failed to update status:', error);
      setError('Failed to update leave status.');
    }
  };

  return (
    <>
      <HRNavbar />
      <HRSidebar />
      <Box maxWidth={'80%'} sx={{marginLeft:'20%', marginTop:'10%'}}>
      <Container >

        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <Paper elevation={3} sx={{ overflowX: 'auto' }}>
            <Table>
              <TableHead sx={{ backgroundColor: '#1976d2' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white' }}><b>ID</b></TableCell>
                  <TableCell sx={{ color: 'white' }}><b>Employee ID</b></TableCell>
                  <TableCell sx={{ color: 'white' }}><b>From Date</b></TableCell>
                  <TableCell sx={{ color: 'white' }}><b>To Date</b></TableCell>
                  <TableCell sx={{ color: 'white' }}><b>Reason</b></TableCell>
                  <TableCell sx={{ color: 'white' }}><b>Status</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaves.map((leave) => (
                  <TableRow key={leave.id}>
                    <TableCell>{leave.id}</TableCell>
                    <TableCell>{leave.employeeId}</TableCell>
                    <TableCell>{leave.fromDate}</TableCell>
                    <TableCell>{leave.toDate}</TableCell>
                    <TableCell>{leave.reason}</TableCell>
                    <TableCell>
                      <FormControl fullWidth size="small">
                        <Select
                          value={leave.status}
                          onChange={(e) =>
                            handleStatusChange(leave.id, e.target.value)
                          }
                        >
                          <MenuItem value="Pending">Pending</MenuItem>
                          <MenuItem value="Approved">Approved</MenuItem>
                          <MenuItem value="Rejected">Rejected</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}
      </Container>
      </Box>
    </>
  );
}
