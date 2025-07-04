import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  neighborhoodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Neighborhood' }
});

export default mongoose.model('Like', likeSchema);
