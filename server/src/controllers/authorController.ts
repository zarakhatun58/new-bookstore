import { Request, Response } from 'express';
import * as AuthorModel from '../models/authorModel';

// const getAllAuthors = async (req: Request, res: Response) => {
//   const authors = await AuthorModel.getAuthors();
//   res.json(authors);
// };
//bonus
const getAllAuthors = async (req: Request, res: Response) => {
  const { name } = req.query;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = (page - 1) * limit;

  try {
    const query = AuthorModel.getAuthors().offset(offset).limit(limit);

    if (name) {
      query.whereILike('name', `%${name}%`);
    }

    const authors = await query;
    res.json({ page, limit, data: authors });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch authors' });
  }
};


const getAuthor = async (req: Request, res: Response) => {
  const author = await AuthorModel.getAuthorById(Number(req.params.id));
  if (author) {
    res.json(author);
  } else {
    res.status(404).send('Author not found');
  }
};

const createAuthor = async (req: Request, res: Response) => {
  const { name, bio, birthdate } = req.body;
  const newAuthor = await AuthorModel.createAuthor({ name, bio, birthdate });
  res.status(201).json(newAuthor);
};

const updateAuthor = async (req: Request, res: Response) => {
  const author = await AuthorModel.updateAuthor(Number(req.params.id), req.body);
  res.status(200).json(author);
};

const deleteAuthor = async (req: Request, res: Response) => {
  await AuthorModel.deleteAuthor(Number(req.params.id));
  res.status(204).send();
};

export { getAllAuthors, getAuthor, createAuthor, updateAuthor, deleteAuthor };
