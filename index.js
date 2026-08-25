const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health / root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Express server is running',
    timestamp: new Date().toISOString()
  });
});

// Single test route
app.get('/api/test', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Test route is working properly'
  });
});

// Export app for testing purposes
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

module.exports = app;
