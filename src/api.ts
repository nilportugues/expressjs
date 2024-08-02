import express from 'express';
import cors from 'cors';
import quotes from './quotes';

export const app = express();

app.use(cors({ origin: true }));

app.use(express.json());
app.use(express.raw({ type: 'application/vnd.custom-type' }));
app.use(express.text({ type: 'text/html' }));

// Healthcheck endpoint
app.get('/', (req, res) => {
  res.status(200).send({ status: 'ok' });
});

const api = express.Router();

// Version the api
app.use('/api/v1', api);

api.get('/hello', (req, res) => {
  res.status(200).send({ message: 'hello world' });
});


// Function to paginate the quotes array
function paginate(array, page, pageSize) {
  const offset = (page - 1) * pageSize;
  const paginatedItems = array.slice(offset, offset + pageSize);
  const totalPages = Math.ceil(array.length / pageSize);
  return {
    page,
    pageSize,
    totalPages,
    totalItems: array.length,
    data: paginatedItems
  };
}

// Route to get paginated quotes
api.get('/quotes', (req: any, res) => {
  const page = Number.parseInt(req.query.page) || 1;
  const pageSize = Number.parseInt(req.query.pageSize) || 10;

  if (page < 1 || pageSize < 1) {
    res.status(400).json({ message: 'Page and pageSize must be positive integers.' });
    return;
  }

  const paginatedQuotes = paginate(quotes, page, pageSize);
  res.status(200).json(paginatedQuotes);
});
