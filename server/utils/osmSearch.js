import axios from 'axios';

export const fetchRealLocations = async (city) => {
  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        city: city,
        country: 'India',
        format: 'json',
        limit: 10,
        addressdetails: 1
      },
      headers: {
        'User-Agent': 'NeighborFit/1.0 (simerseehra13@gmail.com)'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Nominatim fetch error:', error);
    return [];
  }
};
