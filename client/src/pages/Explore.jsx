import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Home, Heart, MapPin, Search, Filter } from 'lucide-react';

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('match');
  const [likedNeighborhoods, setLikedNeighborhoods] = useState(new Set());
  const [neighborhoods, setNeighborhoods] = useState([]);

  const preferences = useMemo(() => {
    const stored = localStorage.getItem('userPreferences');
    return stored ? JSON.parse(stored) : {};
  }, []);

  useEffect(() => {
  const fetchMatches = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/neighborhood/match', preferences);
      const data = Array.isArray(res.data) ? res.data : [];
      const withMap = data.map(n => ({
        ...n,
        mapUrl: n.mapUrl || `https://www.openstreetmap.org/?mlat=${n.lat}&mlon=${n.lon}`
      }));
      setNeighborhoods(withMap);
    } catch (err) {
      console.error('Failed fetch matches:', err);
    }
  };
  fetchMatches();
}, [preferences]);


  const toggleLike = (id) => {
    const newSet = new Set(likedNeighborhoods);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setLikedNeighborhoods(newSet);
  };

  const filteredNeighborhoods = neighborhoods
    .filter(
      (n) =>
        n.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Home className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">NeighborFit</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/onboarding">
                <Button variant="ghost">Update Preferences</Button>
              </Link>
              <Link to="/login">
                <Button className="bg-blue-600 text-white">Sign In</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Your Neighborhood Matches</h1>
          <p className="text-lg text-gray-600">Showing real locations based on your preferences</p>
        </div>

        {/* Search and Sort */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search neighborhoods..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="match">Alphabetical</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNeighborhoods.map((n) => (
            <Card
              key={n.id}
              className="shadow-md bg-white/70 backdrop-blur-sm group hover:shadow-lg transition-all duration-300"
            >
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle className="text-xl">{n.name}</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => toggleLike(n.id)}>
                    <Heart
                      className={`h-5 w-5 ${
                        likedNeighborhoods.has(n.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'
                      }`}
                    />
                  </Button>
                </div>
                <CardDescription className="text-sm">{n.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">Lat: {parseFloat(n.lat).toFixed(2)}</Badge>
                  <Badge variant="outline" className="text-xs">Lon: {parseFloat(n.lon).toFixed(2)}</Badge>
                </div>
                <div className="text-right">
                  <a href={n.mapUrl} target="_blank" rel="noreferrer">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">View on Map</Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredNeighborhoods.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No neighborhoods found</h3>
            <p className="text-gray-600">Try adjusting your preferences or search query</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
