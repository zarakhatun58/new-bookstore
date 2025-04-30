import { Request, Response } from 'express';
import * as BookModel from '../models/bookModel';

// const getAllBooks = async (req: Request, res: Response) => {
//   const books = await BookModel.getBooks();
//   res.json(books);
// };
const getAllBooks = async (req: Request, res: Response) => {
  const { title } = req.query;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = (page - 1) * limit;

  try {
    const query = BookModel.getBooks().offset(offset).limit(limit);

    if (title) {
      query.whereILike('title', `%${title}%`);
    }

    const books = await query;
    res.json({ page, limit, data: books });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};


const getBook = async (req: Request, res: Response) => {
  const book = await BookModel.getBookById(Number(req.params.id));
  if (book) {
    res.json(book);
  } else {
    res.status(404).send('Book not found');
  }
};

const createBook = async (req: Request, res: Response) => {
  const { title, description, published_date, author_id } = req.body;
  const newBook = await BookModel.createBook({ title, description, published_date, author_id });
  res.status(201).json(newBook);
};

const updateBook = async (req: Request, res: Response) => {
  const book = await BookModel.updateBook(Number(req.params.id), req.body);
  res.status(200).json(book);
};

const deleteBook = async (req: Request, res: Response) => {
  await BookModel.deleteBook(Number(req.params.id));
  res.status(204).send();
};

export { getAllBooks, getBook, createBook, updateBook, deleteBook };
