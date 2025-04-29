import db from '../db/knex';

interface Author {
  id: number;
  name: string;
  bio: string | null;
  birthdate: string;
}

const getAuthors = async () => {
  return db('authors');
};

const getAuthorById = async (id: number) => {
  return db('authors').where({ id }).first();
};

const createAuthor = async (author: Omit<Author, 'id'>) => {
  return db('authors').insert(author).returning('*');
};

const updateAuthor = async (id: number, author: Partial<Author>) => {
  return db('authors').where({ id }).update(author);
};

const deleteAuthor = async (id: number) => {
  return db('authors').where({ id }).del();
};

export { getAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor };
