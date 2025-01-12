const { Buffer } = require("buffer");
const { BinTools } = require("avalanche");

// Replace with your raw private key (remove '0x' prefix if present)
const rawPrivateKey = "";  

try {
    const binTools = BinTools.getInstance();

    // Convert hex private key to Buffer
    const privateKeyBuffer = Buffer.from(rawPrivateKey, "hex");

    // Encode Buffer to CB58 format
    const cb58PrivateKey = `PrivateKey-${binTools.cb58Encode(privateKeyBuffer)}`;

    console.log("CB58 Private Key:", cb58PrivateKey);
} catch (error) {
    console.error("Error converting private key to CB58 format:", error.message);
}
