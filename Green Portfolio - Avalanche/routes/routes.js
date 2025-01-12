const express = require("express");
const router = express.Router();
const { User, Transaction } = require("../models/models");
const { getCryptoPrice } = require("../services/alphaVantage");
const { getBalance, createTransaction } = require("../services/avalancheService");

// --------------------- USER ROUTES ---------------------

// Register a new user
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login a user
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (user) {
            res.status(200).json({ message: "Login successful", user });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --------------------- PORTFOLIO ROUTES ---------------------

// Get user portfolio
router.get("/portfolio/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (user) {
            res.status(200).json({ portfolio: user.portfolio });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --------------------- TRANSACTION ROUTES ---------------------

// Buy or sell a token
router.post("/transaction", async (req, res) => {
    try {
        const { userId, token, type, amount, value, transactionFee } = req.body;

        // Record the transaction
        const newTransaction = new Transaction({
            userId,
            token,
            type,
            amount,
            value,
            transactionFee,
        });
        await newTransaction.save();

        // Update the user's portfolio
        const user = await User.findById(userId);
        const portfolioItem = user.portfolio.find((item) => item.token === token);

        if (type === "buy") {
            if (portfolioItem) {
                portfolioItem.amount += amount;
                portfolioItem.value += value;
            } else {
                user.portfolio.push({ token, amount, value });
            }
        } else if (type === "sell" && portfolioItem) {
            portfolioItem.amount -= amount;
            portfolioItem.value -= value;
            if (portfolioItem.amount <= 0) {
                user.portfolio = user.portfolio.filter((item) => item.token !== token);
            }
        }

        await user.save();
        res.status(200).json({ message: "Transaction successful", portfolio: user.portfolio });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get cryptocurrency price
router.get("/crypto-price/:symbol", async (req, res) => {
    try {
        const { symbol } = req.params;
        const priceData = await getCryptoPrice(symbol);
        res.status(200).json(priceData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Get balance endpoint
router.get("/balance", async (req, res) => {
    try {
        const balance = await getBalance();
        res.status(200).json({ balance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Buy cryptocurrency endpoint
router.post("/buy", async (req, res) => {
    const { amount, toAddress } = req.body;

    try {
        const txID = await createTransaction(amount, toAddress);
        res.status(200).json({ message: "Transaction successful", txID });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
