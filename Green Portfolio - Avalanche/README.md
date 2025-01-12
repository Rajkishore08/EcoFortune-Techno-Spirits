# Green Portfolio

Green Portfolio is a cryptocurrency portfolio management tool that:
- Displays real-time cryptocurrency and token data using the Alpha Vantage API.
- Allows users to buy and sell cryptocurrencies using the Avalanche API.
- Provides portfolio management tools to track investments and performance.

---

## Features

1. Fetch real-time cryptocurrency prices.
2. Manage buy/sell transactions securely.
3. Display portfolio performance with charts and trends.

---

## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** (v16 or later)
- **npm** (Node Package Manager)
- **Avalanche Private Key** (in CB58 format)
- **Alpha Vantage API Key**

---

## Installation

1. **Clone the Repository**
2. **Install Dependencies**
   ```bash
   npm install
   ```

   The required dependencies include:
   - **express**: For building the server.
   - **dotenv**: For managing environment variables.
   - **axios**: For API requests.
   - **avalanche**: For interacting with the Avalanche blockchain.

3. **Set Up Environment Variables**
   Create a `.env` file in the root of the project and add the following variables:
   ```env
   PORT=3000
   ALPHA_VANTAGE_API_KEY=<your_alpha_vantage_api_key>
   AVALANCHE_PRIVATE_KEY=<your_cb58_private_key>
   ```

---

## Running the Project

1. **Start the Server**
   ```bash
   node server.js
   ```

2. **Test API Endpoints**
   Use Thunder Client, Postman, or any HTTP client to test the following endpoints:
   - Fetch cryptocurrency prices: `GET /crypto/prices`
   - Buy cryptocurrency: `POST /crypto/buy`
   - Sell cryptocurrency: `POST /crypto/sell`

---


## Troubleshooting

1. **Error: `Cannot read properties of undefined (reading 'slice')`**
   - Ensure your Avalanche private key is in CB58 format.
   - Use the conversion script provided in this project to convert raw keys.

2. **API Key Issues**
   - Double-check the Alpha Vantage API key and Avalanche private key in the `.env` file.

---

## Future Enhancements

1. Add user authentication and authorization.
2. Include advanced portfolio analytics.
3. Integrate support for multiple blockchains.

---
