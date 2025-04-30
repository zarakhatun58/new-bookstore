import db from '../db/knex';

interface Book {
  id: number;
  title: string;
  description: string | null;
  published_date: string;
  author_id: number;
}

// const getBooks = async () => {
//   return db('books');
// };
// bonus
const getBooks = (limit?: number, offset?: number, search?: string) => {
  let query = db('books');

  if (search) {
    query = query.whereILike('title', `%${search}%`);
  }

  if (limit !== undefined && offset !== undefined) {
    query = query.limit(limit).offset(offset);
  }

  return query;
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
