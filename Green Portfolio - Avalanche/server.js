const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/routes");

const app = express();

// Middleware to handle CORS and JSON data
app.use(cors());
app.use(express.json());
app.use("/api", routes);

// Connect to MongoDB (replace with your connection string if using a cloud database)
mongoose.connect("mongodb://localhost:27017/greenPortfolio", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Check if the database connection is successful
mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
