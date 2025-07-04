import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: {
    type: String,
    required: true
  },
   preferences: {
    budget: [Number],
    commute: [Number],
    lifestyle: String,
    transportation: String,
    safety: [Number],
    amenities: {
      gyms: Boolean,
      restaurants: Boolean,
      parks: Boolean,
      shopping: Boolean,
      nightlife: Boolean,
      schools: Boolean
    }
  }
});


export default mongoose.model('User', userSchema);
