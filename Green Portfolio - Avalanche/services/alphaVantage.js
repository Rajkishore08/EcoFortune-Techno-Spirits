const axios = require("axios");

const ALPHA_VANTAGE_API_KEY = "P6FNZHBDISETN4NS"; // API key
const BASE_URL = "https://www.alphavantage.co/query";

// Function to fetch real-time cryptocurrency prices
async function getCryptoPrice(symbol, market = "USD") {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                function: "CURRENCY_EXCHANGE_RATE",
                from_currency: symbol,
                to_currency: market,
                apikey: ALPHA_VANTAGE_API_KEY,
            },
        });

        const exchangeRate = response.data["Realtime Currency Exchange Rate"];
        if (exchangeRate) {
            return {
                symbol: exchangeRate["1. From_Currency Code"],
                market: exchangeRate["3. To_Currency Code"],
                price: parseFloat(exchangeRate["5. Exchange Rate"]),
                lastUpdated: exchangeRate["6. Last Refreshed"],
            };
        } else {
            throw new Error("Invalid response from Alpha Vantage");
        }
    } catch (error) {
        console.error("Error fetching cryptocurrency price:", error.message);
        throw error;
    }
}

module.exports = { getCryptoPrice };
