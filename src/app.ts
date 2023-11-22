import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.routes';

const app: Application = express();

// add parser
app.use(express.json());
// add middleware
app.use(cors());

// add application routes

app.use('/api/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to assignment 2 backend!');
});

export default app;
