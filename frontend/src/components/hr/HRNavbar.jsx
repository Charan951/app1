import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

const HRNavbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleAttendanceClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // ✅ Clear any local storage or auth token if needed
    localStorage.removeItem("hrToken"); // Adjust your key if different

    // ✅ Navigate to login
    navigate("/HR/Login");
  };

  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        {/* Logo */}
        <Box
          component="img"
          src="https://media.licdn.com/dms/image/v2/C4E0BAQFCeV7EWFY7mA/company-logo_200_200/company-logo_200_200/0/1660829823147?e=2147483647&v=beta&t=dqXv3GOH9QultP_4TbKdVXsdUJNBs6R0V80OPMDRWbA"
          sx={{ height: 40, mr: 1 }}
        />

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Speshway Solution
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={RouterLink} to="/dashboard">Dashboard</Button>
          <Button color="inherit" component={RouterLink} to="/EmployeePage">Employees</Button>
          <Button color="inherit" component={RouterLink} to="/leave">Leaves</Button>

          <Button color="inherit" onClick={handleAttendanceClick}>
            Attendance
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem component={RouterLink} to="/hr/attendance" onClick={handleClose}>
              Attendance Dashboard
            </MenuItem>
            <MenuItem component={RouterLink} to="/hr/monthly-summary" onClick={handleClose}>
              Monthly Summary
            </MenuItem>
            <MenuItem component={RouterLink} to="/MonthlySummaryPage" onClick={handleClose}>
              Monthly SummaryPage
            </MenuItem>
          </Menu>

          <Button color="inherit" component={RouterLink} to="/add-announcement">Announcements</Button>
          <Button color="inherit" component={RouterLink} to="/AdminSettings">Settings</Button>
          <Button color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HRNavbar;
