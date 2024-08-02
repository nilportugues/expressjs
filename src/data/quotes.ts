import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const quotes = [
  {
    id: 1,
    quote:
      'The greatest glory in living lies not in never falling, but in rising every time we fall.',
    author: 'Nelson Mandela'
  },
  {
    id: 2,
    quote: 'The way to get started is to quit talking and begin doing.',
    author: 'Walt Disney'
  },
  {
    id: 3,
    quote:
      "Your time is limited, so don't waste it living someone else's life.",
    author: 'Steve Jobs'
  },
  {
    id: 4,
    quote:
      'If life were predictable it would cease to be life, and be without flavor.',
    author: 'Eleanor Roosevelt'
  },
  {
    id: 5,
    quote:
      "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
    author: 'Oprah Winfrey'
  },
  {
    id: 6,
    quote:
      "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
    author: 'James Cameron'
  },
  {
    id: 7,
    quote: "Life is what happens when you're busy making other plans.",
    author: 'John Lennon'
  },
  {
    id: 8,
    quote:
      'Spread love everywhere you go. Let no one ever come to you without leaving happier.',
    author: 'Mother Teresa'
  },
  {
    id: 9,
    quote: 'When you reach the end of your rope, tie a knot in it and hang on.',
    author: 'Franklin D. Roosevelt'
  },
  {
    id: 10,
    quote:
      'Always remember that you are absolutely unique. Just like everyone else.',
    author: 'Margaret Mead'
  },
  {
    id: 11,
    quote:
      "Don't judge each day by the harvest you reap but by the seeds that you plant.",
    author: 'Robert Louis Stevenson'
  },
  {
    id: 12,
    quote:
      'The future belongs to those who believe in the beauty of their dreams.',
    author: 'Eleanor Roosevelt'
  },
  {
    id: 13,
    quote:
      'Tell me and I forget. Teach me and I remember. Involve me and I learn.',
    author: 'Benjamin Franklin'
  },
  {
    id: 14,
    quote:
      'The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.',
    author: 'Helen Keller'
  },
  {
    id: 15,
    quote:
      'It is during our darkest moments that we must focus to see the light.',
    author: 'Aristotle'
  },
  {
    id: 16,
    quote: 'Whoever is happy will make others happy too.',
    author: 'Anne Frank'
  },
  {
    id: 17,
    quote:
      'Do not go where the path may lead, go instead where there is no path and leave a trail.',
    author: 'Ralph Waldo Emerson'
  },
  {
    id: 18,
    quote:
      'You will face many defeats in life, but never let yourself be defeated.',
    author: 'Maya Angelou'
  },
  {
    id: 19,
    quote:
      'The greatest glory in living lies not in never falling, but in rising every time we fall.',
    author: 'Nelson Mandela'
  },
  {
    id: 20,
    quote: 'The way to get started is to quit talking and begin doing.',
    author: 'Walt Disney'
  },
  {
    id: 21,
    quote:
      "Your time is limited, so don't waste it living someone else's life.",
    author: 'Steve Jobs'
  },
  {
    id: 22,
    quote:
      'If life were predictable it would cease to be life, and be without flavor.',
    author: 'Eleanor Roosevelt'
  },
  {
    id: 23,
    quote:
      "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
    author: 'Oprah Winfrey'
  },
  {
    id: 24,
    quote:
      "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
    author: 'James Cameron'
  },
  {
    id: 25,
    quote: "Life is what happens when you're busy making other plans.",
    author: 'John Lennon'
  },
  {
    id: 26,
    quote:
      'Spread love everywhere you go. Let no one ever come to you without leaving happier.',
    author: 'Mother Teresa'
  },
  {
    id: 27,
    quote: 'When you reach the end of your rope, tie a knot in it and hang on.',
    author: 'Franklin D. Roosevelt'
  },
  {
    id: 28,
    quote:
      'Always remember that you are absolutely unique. Just like everyone else.',
    author: 'Margaret Mead'
  },
  {
    id: 29,
    quote:
      "Don't judge each day by the harvest you reap but by the seeds that you plant.",
    author: 'Robert Louis Stevenson'
  },
  {
    id: 30,
    quote:
      'The future belongs to those who believe in the beauty of their dreams.',
    author: 'Eleanor Roosevelt'
  },
  {
    id: 31,
    quote:
      'Tell me and I forget. Teach me and I remember. Involve me and I learn.',
    author: 'Benjamin Franklin'
  },
  {
    id: 32,
    quote:
      'The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.',
    author: 'Helen Keller'
  },
  {
    id: 33,
    quote:
      'It is during our darkest moments that we must focus to see the light.',
    author: 'Aristotle'
  },
  {
    id: 34,
    quote: 'Whoever is happy will make others happy too.',
    author: 'Anne Frank'
  },
  {
    id: 35,
    quote:
      'Do not go where the path may lead, go instead where there is no path and leave a trail.',
    author: 'Ralph Waldo Emerson'
  },
  {
    id: 36,
    quote:
      'You will face many defeats in life, but never let yourself be defeated.',
    author: 'Maya Angelou'
  },
  {
    id: 37,
    quote:
      'The greatest glory in living lies not in never falling, but in rising every time we fall.',
    author: 'Nelson Mandela'
  },
  {
    id: 38,
    quote: 'The way to get started is to quit talking and begin doing.',
    author: 'Walt Disney'
  },
  {
    id: 39,
    quote:
      "Your time is limited, so don't waste it living someone else's life.",
    author: 'Steve Jobs'
  },
  {
    id: 40,
    quote:
      'If life were predictable it would cease to be life, and be without flavor.',
    author: 'Eleanor Roosevelt'
  },
  {
    id: 41,
    quote:
      "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
    author: 'Oprah Winfrey'
  },
  {
    id: 42,
    quote:
      "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
    author: 'James Cameron'
  },
  {
    id: 43,
    quote: "Life is what happens when you're busy making other plans.",
    author: 'John Lennon'
  },
  {
    id: 44,
    quote:
      'Spread love everywhere you go. Let no one ever come to you without leaving happier.',
    author: 'Mother Teresa'
  },
  {
    id: 45,
    quote: 'When you reach the end of your rope, tie a knot in it and hang on.',
    author: 'Franklin D. Roosevelt'
  },
  {
    id: 46,
    quote:
      'Always remember that you are absolutely unique. Just like everyone else.',
    author: 'Margaret Mead'
  },
  {
    id: 47,
    quote:
      "Don't judge each day by the harvest you reap but by the seeds that you plant.",
    author: 'Robert Louis Stevenson'
  },
  {
    id: 48,
    quote:
      'The future belongs to those who believe in the beauty of their dreams.',
    author: 'Eleanor Roosevelt'
  },
  {
    id: 49,
    quote:
      'Tell me and I forget. Teach me and I remember. Involve me and I learn.',
    author: 'Benjamin Franklin'
  },
  {
    id: 50,
    quote:
      'The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.',
    author: 'Helen Keller'
  },
  {
    id: 51,
    quote:
      'It is during our darkest moments that we must focus to see the light.',
    author: 'Aristotle'
  },
  {
    id: 52,
    quote: 'Whoever is happy will make others happy too.',
    author: 'Anne Frank'
  },
  {
    id: 53,
    quote:
      'Do not go where the path may lead, go instead where there is no path and leave a trail.',
    author: 'Ralph Waldo Emerson'
  },
  {
    id: 54,
    quote:
      'You will face many defeats in life, but never let yourself be defeated.',
    author: 'Maya Angelou'
  },
  {
    id: 55,
    quote:
      'The greatest glory in living lies not in never falling, but in rising every time we fall.',
    author: 'Nelson Mandela'
  },
  {
    id: 56,
    quote: 'The way to get started is to quit talking and begin doing.',
    author: 'Walt Disney'
  },
  {
    id: 57,
    quote:
      "Your time is limited, so don't waste it living someone else's life.",
    author: 'Steve Jobs'
  },
  {
    id: 58,
    quote:
      'If life were predictable it would cease to be life, and be without flavor.',
    author: 'Eleanor Roosevelt'
  },
  {
    id: 59,
    quote:
      "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
    author: 'Oprah Winfrey'
  },
  {
    id: 60,
    quote:
      "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
    author: 'James Cameron'
  },
  {
    id: 61,
    quote: "Life is what happens when you're busy making other plans.",
    author: 'John Lennon'
  },
  {
    id: 62,
    quote:
      'Spread love everywhere you go. Let no one ever come to you without leaving happier.',
    author: 'Mother Teresa'
  },
  {
    id: 63,
    quote: 'When you reach the end of your rope, tie a knot in it and hang on.',
    author: 'Franklin D. Roosevelt'
  },
  {
    id: 64,
    quote:
      'Always remember that you are absolutely unique. Just like everyone else.',
    author: 'Margaret Mead'
  },
  {
    id: 65,
    quote:
      "Don't judge each day by the harvest you reap but by the seeds that you plant.",
    author: 'Robert Louis Stevenson'
  },
  {
    id: 66,
    quote:
      'The future belongs to those who believe in the beauty of their dreams.',
    author: 'Eleanor Roosevelt'
  },
  {
    id: 67,
    quote:
      'Tell me and I forget. Teach me and I remember. Involve me and I learn.',
    author: 'Benjamin Franklin'
  },
  {
    id: 68,
    quote:
      'The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.',
    author: 'Helen Keller'
  },
  {
    id: 69,
    quote:
      'It is during our darkest moments that we must focus to see the light.',
    author: 'Aristotle'
  },
  {
    id: 70,
    quote: 'Whoever is happy will make others happy too.',
    author: 'Anne Frank'
  },
  {
    id: 71,
    quote:
      'Do not go where the path may lead, go instead where there is no path and leave a trail.',
    author: 'Ralph Waldo Emerson'
  },
  {
    id: 72,
    quote:
      'You will face many defeats in life, but never let yourself be defeated.',
    author: 'Maya Angelou'
  },
  {
    id: 73,
    quote:
      'The greatest glory in living lies not in never falling, but in rising every time we fall.',
    author: 'Nelson Mandela'
  },
  {
    id: 74,
    quote: 'The way to get started is to quit talking and begin doing.',
    author: 'Walt Disney'
  },
  {
    id: 75,
    quote:
      "Your time is limited, so don't waste it living someone else's life.",
    author: 'Steve Jobs'
  },
  {
    id: 76,
    quote:
      'If life were predictable it would cease to be life, and be without flavor.',
    author: 'Eleanor Roosevelt'
  },
  {
    id: 77,
    quote:
      "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
    author: 'Oprah Winfrey'
  },
  {
    id: 78,
    quote:
      "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
    author: 'James Cameron'
  },
  {
    id: 79,
    quote: "Life is what happens when you're busy making other plans.",
    author: 'John Lennon'
  },
  {
    id: 80,
    quote:
      'Spread love everywhere you go. Let no one ever come to you without leaving happier.',
    author: 'Mother Teresa'
  },
  {
    id: 81,
    quote: 'When you reach the end of your rope, tie a knot in it and hang on.',
    author: 'Franklin D. Roosevelt'
  },
  {
    id: 82,
    quote:
      'Always remember that you are absolutely unique. Just like everyone else.',
    author: 'Margaret Mead'
  },
  {
    id: 83,
    quote:
      "Don't judge each day by the harvest you reap but by the seeds that you plant.",
    author: 'Robert Louis Stevenson'
  },
  {
    id: 84,
    quote:
      'The future belongs to those who believe in the beauty of their dreams.',
    author: 'Eleanor Roosevelt'
  },
  {
    id: 85,
    quote:
      'Tell me and I forget. Teach me and I remember. Involve me and I learn.',
    author: 'Benjamin Franklin'
  },
  {
    id: 86,
    quote:
      'The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.',
    author: 'Helen Keller'
  },
  {
    id: 87,
    quote:
      'It is during our darkest moments that we must focus to see the light.',
    author: 'Aristotle'
  },
  {
    id: 88,
    quote: 'Whoever is happy will make others happy too.',
    author: 'Anne Frank'
  },
  {
    id: 89,
    quote:
      'Do not go where the path may lead, go instead where there is no path and leave a trail.',
    author: 'Ralph Waldo Emerson'
  },
  {
    id: 90,
    quote:
      'You will face many defeats in life, but never let yourself be defeated.',
    author: 'Maya Angelou'
  },
  {
    id: 91,
    quote:
      'The greatest glory in living lies not in never falling, but in rising every time we fall.',
    author: 'Nelson Mandela'
  },
  {
    id: 92,
    quote: 'The way to get started is to quit talking and begin doing.',
    author: 'Walt Disney'
  },
  {
    id: 93,
    quote:
      "Your time is limited, so don't waste it living someone else's life.",
    author: 'Steve Jobs'
  },
  {
    id: 94,
    quote:
      'If life were predictable it would cease to be life, and be without flavor.',
    author: 'Eleanor Roosevelt'
  },
  {
    id: 95,
    quote:
      "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
    author: 'Oprah Winfrey'
  },
  {
    id: 96,
    quote:
      "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
    author: 'James Cameron'
  },
  {
    id: 97,
    quote: "Life is what happens when you're busy making other plans.",
    author: 'John Lennon'
  },
  {
    id: 98,
    quote:
      'Spread love everywhere you go. Let no one ever come to you without leaving happier.',
    author: 'Mother Teresa'
  },
  {
    id: 99,
    quote: 'When you reach the end of your rope, tie a knot in it and hang on.',
    author: 'Franklin D. Roosevelt'
  },
  {
    id: 100,
    quote:
      'Always remember that you are absolutely unique. Just like everyone else.',
    author: 'Margaret Mead'
  }
];

async function populate() {
  // Use a transaction to ensure all operations are executed atomically
  try {
    await prisma.$transaction(async (prisma) => {
      const insertPromises = quotes.map((row) =>
        prisma.quote.create({
          data: {
            id: row.id,
            quote: row.quote,
            author: row.author
          }
        })
      );

      await Promise.all(insertPromises);
      console.log('All records inserted');
    });
  } catch (error) {
    console.error('Error inserting records:', error);
  } finally {
    await prisma.$disconnect();
  }
}

populate();
