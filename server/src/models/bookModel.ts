import db from '../db/knex';

interface Book {
  id: number;
  title: string;
  description: string | null;
  published_date: string;
  author_id: number;
}

const getBooks = async () => {
  return db('books');
};

const getBookById = async (id: number) => {
  return db('books').where({ id }).first();
};

const createBook = async (book: Omit<Book, 'id'>) => {
  return db('books').insert(book).returning('*');
};

const updateBook = async (id: number, book: Partial<Book>) => {
  return db('books').where({ id }).update(book);
};

const deleteBook = async (id: number) => {
  return db('books').where({ id }).del();
};

export { getBooks, getBookById, createBook, updateBook, deleteBook };
