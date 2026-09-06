const axios = require('axios');

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000';

/**
 * POST /api/v1/query
 * Forwards parliamentary queries to the ML FastAPI agent.
 */
const forwardQuery = async (req, res) => {
  try {
    const { query, context_doc } = req.body;

    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    try {
      const mlResponse = await axios.post(
        `${ML_SERVICE_URL}/query`,
        { query, context_doc: context_doc || '' },
        { timeout: 60000 }
      );
      return res.json(mlResponse.data);
    } catch (mlError) {
      // ML service unavailable — return offline fallback
      return res.json({
        answer:
          'The ML service is currently offline. This is a fallback response. In production, this query would be processed by the Gemini-powered RAG pipeline with full source attribution.',
        citations: [],
        offline: true,
      });
    }
  } catch (error) {
    console.error('Query error:', error);
    return res.status(500).json({ error: 'Query failed', details: error.message });
  }
};

module.exports = { forwardQuery };
