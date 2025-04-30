const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/generate', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: 'llama3.2:latest',
      prompt: prompt,
      stream: false
    });

    // Send only the `response` field (not full metadata)
    res.json({ response: response.data.response });
  } catch (error) {
    console.error('Error generating response:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});
