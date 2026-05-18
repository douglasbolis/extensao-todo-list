import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/api/health', (req, res) => {
  res.status(200).send('API is healthy');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
