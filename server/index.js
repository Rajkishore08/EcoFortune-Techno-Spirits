const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // For environment variables
const marketDataRoutes = require('./routes/marketDataRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// API Routes for Green Portfolio
app.use('/api/green-portfolio/market-data', marketDataRoutes);
app.use('/api/green-portfolio/transactions', transactionRoutes);
app.use('/api/green-portfolio/portfolio', portfolioRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));