import db from '../db.js';

const User = {
  // Find user by username
  findByUsername: async (username) => {
    return await db('users').where({ username }).first();
  },

  // Create a new user
  create: async (username, passwordHash, role = 'user') => {
    const [user] = await db('users')
      .insert({ username, password_hash: passwordHash, role })
      .returning(['id', 'username', 'role']);
    return user;
  },

  // Find by ID
  findById: async (id) => {
    return await db('users').where({ id }).first();
  },
};

export default User;