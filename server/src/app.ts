import express from 'express';
import dotenv from 'dotenv';
import authorRoutes from './routes/authorRoutes';
import bookRoutes from './routes/bookRoutes';
import authRoutes from './routes/authorRoutes';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use('/authors', authorRoutes);
app.use('/books', bookRoutes);
app.use('/register', authRoutes);
app.use('/login', authRoutes);
app.use('/profile', authRoutes);

export default app;
