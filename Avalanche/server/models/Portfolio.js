const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const portfolioSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  holdings: [{
    crypto: { type: String, required: true }, // Symbol like BTC, AVAX
    quantity: { type: Number, default: 0 },
    averageBuyPrice: { type: Number }, // Optional
  }],
  // ... other portfolio details
});

module.exports = mongoose.model('Portfolio', portfolioSchema);