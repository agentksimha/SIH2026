const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const Document = require('../models/Document');

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000';

const uploadDocument = async (req, res) => {
  let docRecord = null;
  
  try{
    if(!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const { originalname, path: tempPath, size } = req.file;

    // Create tracking document in DB if user is authenticated
    if (req.user) {
      docRecord = await Document.create({
        userId: req.user._id,
        fileName: originalname,
        fileSize: size,
        status: 'processing'
      });
    }

    // Forward to ML service
    try{
      const formData = new FormData();
      formData.append('file', fs.createReadStream(tempPath), originalname);

      const mlResponse = await axios.post(`${ML_SERVICE_URL}/process-document`,
        formData, { headers: formData.getHeaders(), timeout: 120000 }
      );

      // Clean up temp file
      fs.unlink(tempPath, () => {});

      const mlData = mlResponse.data;

      // Update DB record if it exists
      if (docRecord) {
        docRecord.status = 'completed';
        if (mlData.summary) docRecord.summary = mlData.summary;
        if (mlData.kpis) docRecord.kpis = mlData.kpis;
        if (mlData.wordcloud) docRecord.wordCloud = mlData.wordcloud;
        if (mlData.topics) docRecord.topics = mlData.topics;
        await docRecord.save();
      }

      return res.json({
        message: 'Document processed successfully',
        fileName: originalname,
        size,
        documentId: docRecord ? docRecord._id : null,
        ...mlData,
      });
    }
    catch(mlError){
      // ML service unavailable - return file metadata only
      fs.unlink(tempPath, () => {});
      
      if (docRecord) {
        docRecord.status = 'failed';
        await docRecord.save();
      }

      return res.json({
        message: 'Document uploaded (ML service unavailable - offline mode)',
        fileName: originalname,
        size,
        documentId: docRecord ? docRecord._id : null,
        offline: true,
      });
    }
  } 
  catch(error){
    console.error('Upload error:', error);
    if (docRecord) {
      docRecord.status = 'failed';
      await docRecord.save().catch(e => console.error('Failed to update doc status:', e));
    }
    return res.status(500).json({ error: 'Upload failed', details: error.message });
  }
};

const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find({ userId: req.user._id })
      .sort({ uploadedAt: -1 })
      .select('-__v'); // Exclude mongoose version key
    
    return res.json({
      success: true,
      count: documents.length,
      documents
    });
  } catch (error) {
    console.error('Fetch documents error:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch documents' });
  }
};

module.exports = { uploadDocument, getDocuments };