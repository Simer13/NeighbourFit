import axios from 'axios';

export const updateUserPreferences = async (preferences) => {
  const token = localStorage.getItem('token');
  if (!token) return;

  try {
    await axios.put('http://localhost:5000/api/user/preferences', preferences, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Failed to update preferences:', error);
  }
};
