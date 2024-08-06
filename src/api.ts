import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

import cron from 'node-cron';
import { authenticateJWT } from './middlewares';
import jwt from 'jsonwebtoken';
/*
import { z } from 'zod'
// Quote schema
const QuoteSchema = z.object({
  id: z.number().optional(),
  quote: z.string().nonempty(),
  author: z.string().optional(),
});

type QuoteSchema = z.infer<typeof QuoteSchema>;

// UserLoginToken schema
const UserLoginTokenSchema = z.object({
  id: z.number().optional(),
  email: z.string().email(),
  token: z.string().nonempty(),
  hasBeenUsed: z.boolean(),
});

// UserPushToken schema
const UserPushTokenSchema = z.object({
  id: z.number().optional(),
  deviceOs: z.string().nonempty(),
  deviceToken: z.string().nonempty(),
  userId: z.string().optional(),
});

// UserFavorites schema
const UserFavoritesSchema = z.object({
  id: z.number().optional(),
  quoteId: z.string().nonempty(),
  userId: z.string().nonempty(),
});

// UserKVStore schema
const UserKVStoreSchema = z.object({
  id: z.number().optional(),
  userId: z.string().nonempty(),
  valueKey: z.string().nonempty(),
  valueData: z.string().nonempty(),
});

// Middleware
const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json(result.error.errors);
  }
  req.body = result.data;
  next();
};

//Usage eg:
app.post('/userKVStore', validate(UserKVStoreSchema), async (req, res) => {
    const userKVStore = await prisma.userKVStore.create({
        data: req.body,
    });
    res.json(userKVStore);
});

*/

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

api.post('/login/otp', async (req, res) => {
  const { email } = req.body;

  //Create the user if it doesnt exist
  let user = await prisma.user.findFirst({ where: { email } });
  if (!user) {
    user = await prisma.user.create({ data: { email } });
  }

  //Generate the token: generate a random number of 4 digits
  const token = Math.floor(1000 + Math.random() * 9000);
  await prisma.userLoginToken.create({
    data: { userId: String(user.id), token: String(token), hasBeenUsed: false }
  })

  //Send an email
  console.log({ token: token })

  res.json({});
});

api.post('/login', async (req, res) => {
  const { email, token } = req.body;

  const user = await prisma.user.findFirst({
    where: { email }
  });

  const userToken = await prisma.userLoginToken.findFirst({
    where: {
      userId: String(user.id),
      token,
      hasBeenUsed: false
    }
  })

  if (user && userToken.token == token) {
    await prisma.userLoginToken.update({
      where: { id: userToken.id },
      data: { hasBeenUsed: true }
    })
    const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1y'
    });

    res.json({ accessToken });
  } else {
    res.json({ error: 'Invalid email or token' });
  }
});

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
api.get('/user/:userId/favorites', authenticateJWT, async (req, res) => {
  const userFavorites = await prisma.userFavorites.findMany({
    where: { userId: String(req.params.userId) }
  });
  res.json(userFavorites);
});

api.post('/user/:userId/favorites', authenticateJWT, async (req, res) => {
  const { quoteId } = req.body;

  const userFavorite = await prisma.userFavorites.create({
    data: { quoteId, userId: String(req.params.userId) }
  });
  res.json(userFavorite);
});

api.delete('/user/:userId/favorites/:id', authenticateJWT, async (req, res) => {
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
api.get('/user/push-token', authenticateJWT, async (req, res) => {
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


api.delete('/user/push-token', async (req, res) => {
  const { deviceOs, deviceToken, userId } = req.body;
  const userPushToken = await prisma.userPushToken.delete({
    where: {
      id: await prisma.userPushToken.findFirst({
        where: { deviceOs, deviceToken, userId: userId ?? '' }
      }).then(r => r.id)
    }
  });
  res.json(userPushToken);
});


// UserKVStore endpoints
api.get('/user/:userId/key-value', authenticateJWT, async (req, res) => {
  const userKVStores = await prisma.userKVStore.findMany({
    where: { userId: String(req.params.userId) }
  });
  res.json(userKVStores);
});

api.post('/user/:userId/key-value', authenticateJWT, async (req, res) => {
  const { valueKey, valueData } = req.body;
  const { userId } = req.params;
  const userKVStore = await prisma.userKVStore.create({
    data: { userId, valueKey, valueData }
  });
  res.json(userKVStore);
});

api.delete('/user/:userId/key-value/:id', authenticateJWT, async (req, res) => {
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
