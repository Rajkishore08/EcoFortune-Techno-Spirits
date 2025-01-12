const { Avalanche, BinTools, Buffer, AVMAPI, KeyChain } = require("avalanche");

// Avalanche network configuration
const networkID = 1; // Mainnet = 1, Fuji Testnet = 5
const avalanche = new Avalanche("api.avax.network", 443, "https");
const avm = avalanche.XChain(); // AVM for transactions
const keyChain = avm.keyChain();
keyChain.importKey(""); // Replace with private key
const address = keyChain.getAddressStrings()[0];

// Function to fetch balance
async function getBalance() {
    try {
        const balance = await avm.getBalance(address);
        return balance;
    } catch (error) {
        throw new Error("Error fetching balance: " + error.message);
    }
}

// Function to create a transaction
async function createTransaction(amount, toAddress) {
    try {
        const tx = await avm.buildBaseTx(
            amount,
            avm.getTxFee(),
            toAddress,
            [address],
            [address]
        );
        const signedTx = keyChain.signTx(tx);
        const txID = await avm.issueTx(signedTx);
        return txID;
    } catch (error) {
        throw new Error("Error creating transaction: " + error.message);
    }
}

module.exports = { getBalance, createTransaction };
