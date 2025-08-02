import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Container
} from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { toWords } from 'number-to-words';


const PayslipList = () => {
  const [payslips, setPayslips] = useState([]);
  const [salaryStructure, setSalaryStructure] = useState([]);

  useEffect(() => {
    axios.get('https://app1-8-eqwt.onrender.com/api/payslips/get')
      .then(res => setPayslips(res.data))
      .catch(err => console.error('Failed to fetch payslips', err));
  }, []);

  useEffect(() => {
    axios.get('https://app1-8-eqwt.onrender.com/api/salaries')
      .then(res => setSalaryStructure(res.data))
      .catch(err => console.error('Failed to fetch payslips', err));
  }, []);

const generatePDF = (payslip) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let cursorY = 10;

  const logo = 'https://media.licdn.com/dms/image/v2/C4E0BAQFCeV7EWFY7mA/company-logo_200_200/company-logo_200_200/0/1660829823147?e=2147483647&v=beta&t=dqXv3GOH9QultP_4TbKdVXsdUJNBs6R0V80OPMDRWbA';
  doc.setFont("Times New Roman", "normal");

  // HEADER BOX
  doc.rect(10, cursorY, pageWidth - 20, 20);
  doc.addImage(logo, 'PNG', 12, cursorY +1, 20, 20);
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('SPESHWAY SOLUTIONS PVT LTD', pageWidth / 2, cursorY + 7, { align: 'center' });
  doc.setFontSize(11);
  doc.text(`Payslip for the month of ${payslip.month} ${payslip.year}`, pageWidth / 2, cursorY + 17, { align: 'center' });
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text('Hitech City, Hyd.', pageWidth / 2, cursorY + 12, { align: 'center' });
  
  cursorY += 20;

  // PERSONAL INFO BOX
  doc.rect(10, cursorY, pageWidth - 20, 42); // Outer box
  doc.line(pageWidth / 2, cursorY, pageWidth / 2, cursorY + 42); // Vertical divider

  doc.setFontSize(10);
  const labelLeftX = 12;
  const valueLeftX = 60;
  const labelRightX = pageWidth / 2 + 2;
  const valueRightX = pageWidth - 45;
  const lineSpacing = 7;
  let y = cursorY + 5;

  const fields = [
    ['Name', payslip.name || '', 'Employee No', payslip.employeeId || ''],
    ['Joining Date', payslip.joiningDate || '', 'Bank Name', payslip.bankname || ''],
    ['Designation', payslip.designation || '', 'Bank Account No', payslip.bankaccountnumber || ''],
    ['Department', payslip.department || '', 'PAN No', payslip.pan || ''],
    ['LOP', payslip.lopDays || '', 'UAN No', payslip.uan || ''],
    ['Effective Work Days', payslip.workingdays || 0, '', ''],
  ];

  fields.forEach(([labelL, valueL, labelR, valueR]) => {
    doc.text(`${labelL}:`, labelLeftX, y);
    doc.text(`${valueL}`, valueLeftX, y);

    if (labelR) {
      doc.text(`${labelR}:`, labelRightX, y);
      doc.text(`${valueR}`, valueRightX, y);
    }

    y += lineSpacing;
  });
  cursorY += 42;

  // EARNINGS & DEDUCTIONS BOX
  doc.rect(10, cursorY, pageWidth - 20, 100);

  autoTable(doc, {
    startY: cursorY + 2,
    head: [['Earnings', 'Actual', 'Deductions', 'Actual']],
    body: [
      ['BASIC', payslip.basic || 0, 'PROF TAX', payslip.proftax || 0],
      ['DA', payslip.da || 0, 'PF', payslip.pf || 0],
      ['HRA', payslip.hra || 0, 'LOSS OF PAY', payslip.lopamount || 0, ''],
      ['CONVEYANCE', payslip.conveyance || 0, '', ''],
      ['MEDICAL ALLOWANCE', payslip.medicalallowances || 0, '', ''],
      ['SPECIAL ALLOWANCE',  payslip.specialallowances || 0, '', ''],
    ],
    styles: {
      fontSize: 9,
      lineWidth: 0.1,
      lineColor: [0, 0, 0],
    },
    headStyles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      fontStyle: 'bold',
      lineWidth: 0.2,
      lineColor: [0, 0, 0],
    },
    tableWidth: pageWidth,
    columnStyles: {
      0: { cellWidth: 65 },
      1: { cellWidth: 26 },
      2: { cellWidth: 65 },
      3: { cellWidth: 26 },
    }
  });

  cursorY = doc.lastAutoTable.finalY ;

  // TOTALS BOX
  doc.rect(10, cursorY, pageWidth - 20, 10);

  const totalEarnings = [
    +payslip.basic, +payslip.da, +payslip.hra, +payslip.conveyance,
    +payslip.medicalallowances, +payslip.specialallowances
  ].reduce((a, b) => a + (b || 0), 0);


  const totalDeductions = [+payslip.proftax, +payslip.pf, +payslip.lopamount].reduce((a, b) => a + (b || 0), 0);
  const netPay = totalEarnings - totalDeductions;

  doc.setFontSize(10);
  doc.setFont(undefined, 'bold');
  doc.text(`Total Earnings: INR ${totalEarnings} `, 15, cursorY + 6);
  doc.text(`Total Deductions: INR ${totalDeductions}`, pageWidth - 90, cursorY + 6);
  cursorY += 15;

  // NET PAY IN WORDS
const netInWords = `${toWords(netPay).replace(/\b\w/g, c => c.toUpperCase())} Rupees Only`;

doc.setFontSize(12);
doc.setFont("Times", "italic"); // Set italic font
doc.text(`Net Pay for the month: ${netPay.toFixed(0)}`, 15, cursorY);
doc.text(`(${netInWords})`, 15, cursorY + 7);


const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(9);
  doc.setTextColor(0, 102, 204);
  doc.text(
    "SPESHWAYSOLUTIONS PVT.LTD",
    doc.internal.pageSize.width / 2,
    pageHeight - 20,
    { align: 'center' }
  );

  doc.setTextColor(0, 0, 0);
  doc.text(
    "Plot No 1/C, Syno 83/1, Raidurgam, Knowledge City Rd, Panmaktha",
    doc.internal.pageSize.width / 2,
    pageHeight - 15,
    { align: 'center' }
  );

  doc.text(
    "Hyderabad Telangana 500081 | Email: info@speshway.com",
    doc.internal.pageSize.width / 2,
    pageHeight - 10,
    { align: 'center' }
  );

  // SAVE PDF
  doc.save(`Payslip_${payslip.name}_${payslip.month}_${payslip.year}.pdf`);
};






  return (
    <Container sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Payslips
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'><strong>Employee ID</strong></TableCell>
              <TableCell align='center'><strong>Employee Name</strong></TableCell>
              <TableCell align='center'><strong>Month</strong></TableCell>
              <TableCell align='center'><strong>Year</strong></TableCell>
              <TableCell align="center"><strong>Net Salary (₹)</strong></TableCell>
              <TableCell align="center"><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payslips.map((p) => (
              <TableRow key={p.id}>
                <TableCell align='center'>{p.employeeId}</TableCell>
                <TableCell align='center'>{p.name}</TableCell>
                <TableCell align='center'>{p.month}</TableCell>
                <TableCell align='center'>{p.year}</TableCell>
                <TableCell align="center">₹{p.netSalary}</TableCell>
                <TableCell align="center">
                  <PictureAsPdfIcon
                    style={{ cursor: 'pointer', color: 'red' }}
                    onClick={() => generatePDF(p)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {payslips.length === 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              No payslips available.
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default PayslipList;
