import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const register = async (req, res) => {
  console.log("🔍 Incoming signup data:", req.body);  // 👈 Add this line

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: 'Email already in use' });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });
    const token = createToken(user._id);

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error("❌ Signup error:", err);
    res.status(500).json({ error: 'Signup failed' });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid email' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Incorrect password' });

    const token = createToken(user._id);
    res.json({ token, user: { id: user._id, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};
