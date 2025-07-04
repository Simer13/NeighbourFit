import Comment from '../models/Comment.js';

export const addComment = async (req, res) => {
  const { userId, neighborhoodId, content } = req.body;
  try {
    const comment = await Comment.create({ userId, neighborhoodId, content });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ neighborhoodId: req.params.neighborhoodId })
      .populate('userId', 'email')
      .sort({ timestamp: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};
