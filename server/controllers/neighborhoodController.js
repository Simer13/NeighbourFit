import { matchNeighborhoods } from '../utils/matchAlgorithm.js';
export const getMatches = async (req, res) => {
  await matchNeighborhoods(req, res);
};
