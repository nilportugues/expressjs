import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import cron from 'node-cron';

cron.schedule('* * * * *', async () => {
  try {
    await fetch('https://expressjs-production-01a4.up.railway.app/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {}
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

// UserFavorites endpoints
api.get('/user/:userId/favorites', async (req, res) => {
  const userFavorites = await prisma.userFavorites.findMany({
    where: { userId: String(req.params.userId) }
  });
  res.json(userFavorites);
});

api.post('/user/:userId/favorites', async (req, res) => {
  const { quoteId } = req.body;

  const userFavorite = await prisma.userFavorites.create({
    data: { quoteId, userId: String(req.params.userId) }
  });
  res.json(userFavorite);
});

api.delete('/user/:userId/favorites/:id', async (req, res) => {
  const { id } = req.params;

  const row = await prisma.userFavorites.findFirst({
    where: { id: parseInt(id), AND: { userId: String(req.params.userId) } }
  });
  if (!row) {
    res.status(404).json({});
    return;
  }

  await prisma.userFavorites.delete({
    where: {
      id: row.id
    }
  });

  res.json({});
});

// UserPushToken endpoints
api.get('/user/push-token', async (req, res) => {
  const userPushTokens = await prisma.userPushToken.findMany({
    where: { userId: String(req.query.userId) }
  });
  res.json(userPushTokens);
});

api.post('/user/push-token', async (req, res) => {
  const { deviceOs, deviceToken, userId } = req.body;
  const userPushToken = await prisma.userPushToken.create({
    data: { deviceOs, deviceToken, userId: userId ?? '' }
  });
  res.json(userPushToken);
});

// UserLoginToken endpoints
api.get('/auth/login/token', async (req, res) => {
  const userLoginTokens = await prisma.userLoginToken.findMany();
  res.json(userLoginTokens);
});

api.post('/auth/login/token', async (req, res) => {
  const { email, token, hasBeenUsed } = req.body;
  const userLoginToken = await prisma.userLoginToken.create({
    data: { email, token, hasBeenUsed }
  });
  res.json(userLoginToken);
});

// UserKVStore endpoints
api.get('/user/:userId/key-value', async (req, res) => {
  const userKVStores = await prisma.userKVStore.findMany({
    where: { userId: String(req.params.userId) }
  });
  res.json(userKVStores);
});

api.post('/user/:userId/key-value', async (req, res) => {
  const { valueKey, valueData } = req.body;
  const { userId } = req.params;
  const userKVStore = await prisma.userKVStore.create({
    data: { userId, valueKey, valueData }
  });
  res.json(userKVStore);
});

api.delete('/user/:userId/key-value/:id', async (req, res) => {
  const { id, userId } = req.params;

  const row = await prisma.userKVStore.findFirst({
    where: { id: parseInt(id), AND: { userId: String(req.params.userId) } }
  });
  if (!row) {
    res.status(404).json({});
    return;
  }

  await prisma.userKVStore.delete({
    where: { id: parseInt(id), AND: { userId } }
  });
  res.json({});
});
