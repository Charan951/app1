require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import route modules
const routes = {
  auth: require("./routes/authRoutes"),
  employeeAuth: require("./routes/employeeAuthRoutes"),
  employees: require("./routes/employeeRoutes"),
  salaries: require("./routes/salaryStructureRoutes"),
  payslips: require("./routes/payslipRoutes"),
  leave: require("./routes/leaveRoutes"),
  breaks: require("./routes/breakRoutes"),
  attendance: require("./routes/clockin-clockoutRoutes"),
  announcements: require("./routes/announcementRoutes"),
  feedbacks: require("./routes/feedbackRoutes"),
  payrolls: require("./routes/payrollRoutes"),
  appSettings: require("./routes/appSettingRoutes"),
  holidays: require("./routes/holidayRoutes"),
  notice: require("./routes/notice.routes"),
  settings: require("./routes/settings.routes"),
  policies: require("./routes/policyRoutes"),
  notifications: require("./routes/notificationRoutes"),
  // attendance: require("./routes/attendanceRoutes"), // Uncomment if needed
};

// Route bindings
app.use("/api/auth", routes.auth);
app.use("/api/auth/employee", routes.employeeAuth);
app.use("/api/employees", routes.employees);
app.use("/api/salaries", routes.salaries);
app.use("/api/payslips", routes.payslips);
app.use("/api/leave", routes.leave);
app.use("/api/break", routes.breaks);
app.use("/api/attendance", routes.attendance);
app.use("/api/announcements", routes.announcements);
app.use("/api/feedbacks", routes.feedbacks);
app.use("/api/payrolls", routes.payrolls);
app.use("/api/settings", routes.appSettings);
app.use("/api/holidays", routes.holidays);
app.use("/api", routes.notice);
app.use("/api", routes.settings);
app.use("/api", routes.policies);
app.use("/api", routes.notifications);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
