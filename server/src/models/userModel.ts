import db from '../db/knex';

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}
const getUserById = async (id: number) => {
    return db('users').where({ id }).first();
  };
const getUserByEmail = async (email: string) => {
  return db('users').where({ email }).first();
};

const createUser = async (user: Omit<User, 'id'>) => {
  return db('users').insert(user).returning('*');
};

export { getUserByEmail, createUser , getUserById};
