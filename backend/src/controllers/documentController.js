const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000';

const uploadDocument = async (req, res) => {
  try{
    if(!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const { originalname, path: tempPath, size } = req.file;

    // Forward to ML service
    try{
      const formData = new FormData();
      formData.append('file', fs.createReadStream(tempPath), originalname);

      const mlResponse = await axios.post(`${ML_SERVICE_URL}/process-document`,
        formData, { headers: formData.getHeaders(), timeout: 120000 }
      );

      // Clean up temp file
      fs.unlink(tempPath, () => {});

      return res.json({
        message: 'Document processed successfully',
        fileName: originalname,
        size,
        ...mlResponse.data,
      });
    }
    catch(mlError){
      // ML service unavailable — return file metadata only
      fs.unlink(tempPath, () => {});
      return res.json({
        message: 'Document uploaded (ML service unavailable — offline mode)',
        fileName: originalname,
        size,
        offline: true,
      });
    }
  } 
  catch(error){
    console.error('Upload error:', error);
    return res.status(500).json({ error: 'Upload failed', details: error.message });
  }
};

module.exports = { uploadDocument };