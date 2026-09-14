import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

export const register = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const hash = bcrypt.hashSync(password, 10);
    const user = await User.create(username, hash, role || 'user');
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: 'Username already exists' });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findByUsername(username);
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
  res.json({ token, role: user.role });
};