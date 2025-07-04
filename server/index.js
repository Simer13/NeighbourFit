import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import neighborhoodRoutes from './routes/neighborhoodRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import likeRoutes from './routes/likeRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/neighborhood', neighborhoodRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);

app.get('/', (req, res) => {
  res.send('API is running');
});
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch(err => console.error(err));
