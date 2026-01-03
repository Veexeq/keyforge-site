import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Działa! KeyForge Backend tutaj.');
});

app.listen(port, () => {
  console.log(`[server]: Serwer działa na porcie ${port}`);
});
