import User from '../models/User.js';

export const savePreferences = async (req, res) => {
  const userId = req.user.id;
  const preferences = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, { preferences }, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ message: 'Preferences updated', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save preferences' });
  }
};
