const express = require('express');
const router = express.Router();
const { getMockReport } = require('../controllers/reportController');

// GET /api/v1/reports/mock
router.get('/mock', getMockReport);

module.exports = router;
