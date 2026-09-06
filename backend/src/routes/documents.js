const express = require('express');
const router = express.Router();
const { uploadDocument } = require('../controllers/documentController');
const upload = require('../middleware/upload');

// POST /api/v1/documents/upload
router.post('/upload', upload.single('file'), uploadDocument);

module.exports = router;
