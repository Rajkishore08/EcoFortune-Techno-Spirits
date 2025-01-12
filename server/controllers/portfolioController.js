const Portfolio = require('../models/Portfolio');

exports.getUserPortfolio = async (req, res) => {
  const { userId } = req.params;
  try {
    const portfolio = await Portfolio.findOne({ user: userId }).populate('holdings.crypto');
    if (portfolio) {
      res.json(portfolio);
    } else {
      res.status(404).json({ message: 'Portfolio not found for this user.' });
    }
  } catch (error) {
    console.error('Error fetching user portfolio:', error);
    res.status(500).json({ message: 'Failed to fetch user portfolio.' });
  }
};

// ... other portfolio related controllers (e.g., updating holdings)