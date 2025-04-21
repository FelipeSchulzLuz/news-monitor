import express, { Request, Response, NextFunction } from 'express';
import noticesRouter from './routes/notices';
import searchRouter  from './routes/search';

const app = express();
app.use(express.json());

app.use('/notices', noticesRouter);
app.use('/search',  searchRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Erro interno no servidor' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));