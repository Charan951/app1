import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function WelcomePage() {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        backgroundImage: 'url(https://media.istockphoto.com/id/1198684732/photo/stars-and-galaxy-space-sky-night-background.jpg?s=612x612&w=0&k=20&c=U6AnXKYJpi9H2tCeGGXSAS_ctR4pgsC-yC07J5ECH5M=)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        px: 2,
      }}
    >
      {/* 👇 Company Logo */}
      <img
        src="https://media.licdn.com/dms/image/v2/C4E0BAQFCeV7EWFY7mA/company-logo_200_200/company-logo_200_200/0/1660829823147?e=2147483647&v=beta&t=dqXv3GOH9QultP_4TbKdVXsdUJNBs6R0V80OPMDRWbA"
        alt="Company Logo"
        style={{
          width: '150px',
          height: 'auto',
          marginBottom: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        }}
      />

      <Typography
        variant="h2"
        gutterBottom
        sx={{ fontWeight: 'bold', textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}
      >
        Welcome to Speshway Solutions
      </Typography>

      <Typography
        variant="h6"
        sx={{ mb: 4, textShadow: '1px 1px 6px rgba(0,0,0,0.7)' }}
      >
        Explore the universe of possibilities with us!
      </Typography>

      <Link to="/HR/Login" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary" sx={{ px: 4, py: 1.5 }}>
          HR Login
        </Button>
      </Link>

      <br />

      <Link to="/employee/login" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary" sx={{ px: 4, py: 1.5 }}>
          Employee Login
        </Button>
      </Link>
    </Box>
  );
}
