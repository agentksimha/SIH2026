const express = require('express');
const router = express.Router();
const { forwardQuery } = require('../controllers/queryController');

// POST /api/v1/query
router.post('/', forwardQuery);

module.exports = router;
