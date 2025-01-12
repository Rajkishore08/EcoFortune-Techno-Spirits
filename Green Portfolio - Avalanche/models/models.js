const mongoose = require("mongoose");

// Define the User Schema
const userSchema = new mongoose.Schema({
    username: String,
    email: { type: String, required: true, unique: true },  // For email-based login or notifications
    password: { type: String, required: true },  // For authentication
    portfolio: [
        {
            token: String,  // Cryptocurrency/token name (e.g., "AVAX")
            amount: Number, // Amount owned by the user
            value: Number,  // Current market value of the token
        },
    ],
    portfolioValue: { type: Number, default: 0 },  // Total value of the user's portfolio (calculated dynamically)
});


// Define the Transaction Schema
const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User model
    token: String,       // The cryptocurrency/token name
    type: String,        // "buy" or "sell"
    amount: Number,      // Amount bought or sold
    value: Number,       // Value of the token at the time of the transaction
    transactionFee: { type: Number, default: 0 },  // Transaction fees, if applicable
    status: { type: String, default: "completed" },  // Can be "pending", "completed", or "failed"
    date: { type: Date, default: Date.now },
});

const portfolioHistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, default: Date.now },
    portfolioSnapshot: [
        {
            token: String,
            amount: Number,
            value: Number,
        },
    ],
});

userSchema.index({ email: 1 });  // Create an index on the email field to speed up searches by email
transactionSchema.index({ userId: 1 });  // Create an index on userId for faster transaction lookups

// const PortfolioHistory = mongoose.model("PortfolioHistory", portfolioHistorySchema);


// Export the models
module.exports = {
    User: mongoose.model("User", userSchema),
    Transaction: mongoose.model("Transaction", transactionSchema),
};
