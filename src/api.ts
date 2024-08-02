import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import cron from 'node-cron'

cron.schedule('* * * * *', async () => {
  try {
      await fetch('https://expressjs-production-01a4.up.railway.app/', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });
  } catch (error) {
  }
});

const prisma = new PrismaClient();
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


api.get('/quotes', async (req: any, res) => {
  const page = Number.parseInt(req.query.page) || 1;
  const pageSize = Number.parseInt(req.query.pageSize) || 10;

  if (page < 1 || pageSize < 1) {
    res
      .status(400)
      .json({ message: 'Page and pageSize must be positive integers.' });
    return;
  }

  const data = await prisma.quote.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize
  });

  const totalItems = await prisma.quote.count();

  res.status(200).json({
    page,
    pageSize,
    totalItems,
    totalPages: Math.ceil(totalItems / pageSize),
    data
  });
});

// add get,post,delete for UserFavorites

// add get,post for UserPushToken

// add post,get for UserLoginToken

// add get,post,delete for UserKVStore