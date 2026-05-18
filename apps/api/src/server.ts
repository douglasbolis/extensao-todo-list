import express from 'express';
import cors from 'cors';
import todosController from './controllers/todosController';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).send('API is healthy');
});

app.use('/api/todos', todosController);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
