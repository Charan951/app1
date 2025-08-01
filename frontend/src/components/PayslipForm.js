import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  Typography
} from '@mui/material';

const PayslipForm = () => {
  const [form, setForm] = useState({
    employeeId: '',
    name: '',
    joiningDate: '',
    designation: '',
    department: '',
    location: '',
    workingdays: '',
    lopDays: '',
    lopamount: '',
    bankname: '',
    bankaccountnumber: '',
    month: '',
    year: '',
    basic: '',
    da: '',
    hra: '',
    conveyance: '',
    medicalallowances: '',
    specialallowances: '',
    proftax: '',
    pf: '',
    netSalary: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const netSalary =
      +form.basic + +form.hra + +form.conveyance + +form.medicalallowances + +form.specialallowances - (+form.proftax + +form.pf);
    await axios.post('http://localhost:5000/api/payslips/create', {
      ...form,
      netSalary,
    });
    alert('Payslip generated!');
    setForm({
      employeeId: '',
      name: '',
      joiningDate: '',
      designation: '',
      department: '',
      location: '',
      workingdays: '',
      lopDays: '',
      lopamount: '',
      bankname: '',
      bankaccountnumber: '',
      month: '',
      year: '',
      basic: '',
      da: '',
      hra: '',
      conveyance: '',
      medicalallowances: '',
      specialallowances: '',
      proftax: '',
      pf: '',
      netSalary: '',
    });
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: '80%', mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Generate Payslip
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Employee ID"
              name="employeeId"
              value={form.employeeId}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Joining Date"
              name="joiningDate"
              value={form.joiningDate}
              onChange={handleChange}
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Designation"
              name="designation"
              value={form.designation}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Department"
              name="department"
              value={form.department}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Location"
              name="location"
              value={form.location}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Working Days"
              name="workingdays"
              value={form.workingdays}
              onChange={handleChange}
              fullWidth
              required
              type="number"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="LOP Days"
              name="lopDays"
              value={form.lopDays}
              onChange={handleChange}
              fullWidth
              required
              type="number"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="LOP Amount"
              name="lopamount"
              value={form.lopamount}
              onChange={handleChange}
              fullWidth
              required
              type="number"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Bank Name"
              name="bankname"
              value={form.bankname}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Bank Account Number"
              name="bankaccountnumber"
              value={form.bankaccountnumber}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Month"
              name="month"
              value={form.month}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Year"
              name="year"
              value={form.year}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Basic"
              name="basic"
              value={form.basic}
              onChange={handleChange}
              fullWidth
              required
              type="number"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="DA"
              name="da"
              value={form.da}
              onChange={handleChange}
              fullWidth
              required
              type="number"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="HRA"
              name="hra"
              value={form.hra}
              onChange={handleChange}
              fullWidth
              required
              type="number"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Conveyance"
              name="conveyance"
              value={form.conveyance}
              onChange={handleChange}
              fullWidth
              required
              type="number"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Medical Allowance"
              name="medicalallowances"
              value={form.medicalallowances}
              onChange={handleChange}
              fullWidth
              required
              type="number"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Special Allowance"
              name="specialallowances"
              value={form.specialallowances}
              onChange={handleChange}
              fullWidth
              required
              type="number"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Professional Tax"
              name="proftax"
              value={form.proftax}
              onChange={handleChange}
              fullWidth
              required
              type="number"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="PF"
              name="pf"
              value={form.pf}
              onChange={handleChange}
              fullWidth
              required
              type="number"
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add data
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default PayslipForm;
