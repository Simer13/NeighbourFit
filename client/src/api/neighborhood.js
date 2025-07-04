import axios from 'axios';

export const getMatchedNeighborhoods = async (preferences) => {
  console.log("Sending preferences to backend:", preferences);
  const response = await axios.post('http://localhost:5000/api/neighborhood/match', preferences);
  return response.data;
};
