// routes/attendanceRoutes.js

const express = require('express');
const router = express.Router();
const controller = require('../controllers/clockin-clockoutController');


router.get('/', controller.getAllAttendance);
router.post('/clockin', controller.markClockIn);
router.post('/clockout', controller.markClockOut);


module.exports = router;
