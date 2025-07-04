import mongoose from 'mongoose'

const NeighborhoodSchema = new mongoose.Schema({
  name: String,
  description: String,
  location: String,
  image: String,
  mapUrl: String,
  commute: String,
  walkability: String,
  type: String,
  amenities: [String],
})

export default mongoose.model('Neighborhood', NeighborhoodSchema)
