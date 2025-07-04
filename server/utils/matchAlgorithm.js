import fetch from 'node-fetch';
import https from 'https';

const agent = new https.Agent({
  family: 4, 
  timeout: 5000
});

const majorCities = ['Delhi','Mumbai','Bangalore','Hyderabad','Kolkata','Chennai'];

export const matchNeighborhoods = async (req, res) => {
  const prefs = req.body;
  try {
    const results = [];

    for (const city of majorCities) {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}&countrycodes=in&limit=5`,
        {
          headers: {
            'User-Agent': 'NeighborFit/1.0 (simerseehra13@gmail.com)',
            'Accept-Language': 'en'
          },
          agent
        }
      );
      if (!response.ok) {
        console.error(`Fetch failed for ${city}: ${response.status}`);
        continue;
      }
      const data = await response.json();
      for (const loc of data) {
        results.push({
          id: loc.place_id,
          name: loc.display_name.split(',')[0],
          description: loc.display_name,
          lat: loc.lat,
          lon: loc.lon,
          mapUrl: `https://www.openstreetmap.org/?mlat=${loc.lat}&mlon=${loc.lon}`,
          matchScore: Math.floor(Math.random() * 30 + 70),
          averageRent: Math.floor(Math.random() * (prefs.rentBudget || 10000)),
          safetyScore: Math.floor(Math.random() * 5 + 5),
          commuteTime: Math.floor(Math.random() * 30 + 10),
          lifestyle: prefs.lifestyle || 'Urban',
          amenities: prefs.mustHaveAmenities || [],
          likes: Math.floor(Math.random() * 500),
        });
      }
      
      await new Promise(r => setTimeout(r, 1000));
    }

    res.json(results);
  } catch (err) {
    console.error('Error in matchNeighborhoods:', err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};
