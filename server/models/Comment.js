import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  neighborhoodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Neighborhood' },
  content: String,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Comment', commentSchema);
