import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (_, res) => {
  res.send('Działa! KeyForge Backend tutaj.');
});

app.get('/api/products', async (_, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true, // Dołącz info o kategorii
        variants: true, // Dołącz warianty (np. 10 Pack, 70 Pack)
        images: true,   // Dołącz zdjęcia
        reviews: true   // Dołącz opinie (jeśli są)
      }
    });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Błąd podczas pobierania produktów' });
  }
});

app.listen(port, () => {
  console.log(`[server]: Serwer działa na porcie ${port}`);
});
