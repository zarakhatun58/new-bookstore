import express from 'express';
import dotenv from 'dotenv';
import authorRoutes from './routes/authorRoutes';
import bookRoutes from './routes/bookRoutes';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/authors', authorRoutes);
app.use('/books', bookRoutes);

export default app;
