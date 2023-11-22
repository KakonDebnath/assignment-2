import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();

// add parser
app.use(express.json());
// add middleware
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to assignment 2 backend!');
});

export default app;
