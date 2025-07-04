import Like from '../models/Like.js';

export const likeNeighborhood = async (req, res) => {
  const { userId, neighborhoodId } = req.body;
  try {
    await Like.create({ userId, neighborhoodId });
    res.status(200).json({ message: 'Liked successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Like failed' });
  }
};

export const unlikeNeighborhood = async (req, res) => {
  const { userId, neighborhoodId } = req.body;
  try {
    await Like.deleteOne({ userId, neighborhoodId });
    res.status(200).json({ message: 'Unliked successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Unlike failed' });
  }
};
