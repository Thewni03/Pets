// Import the crypto module for hash generation
import crypto from 'crypto';

// Step 1: Enter your test values here
const merchant_id = '1230311';
const order_id = 'Order12345';
const payhere_amount = '1000.00'; // Must be formatted to 2 decimal places
const payhere_currency = 'LKR';
const status_code = '2'; // 2 = success
const merchant_secret = 'NTc0NDAyOTM0MTI1NTAzNDcxNTI2MDEzMzM5NDM0ODE4MjA0OTA='; // Replace with your actual secret

console.log('Input Values:');
console.log({
  merchant_id,
  order_id,
  payhere_amount,
  payhere_currency,
  status_code
});

// Step 2: Generate the MD5 hash of the merchant secret (uppercased)
const generateSecretHash = () => {
  return crypto
    .createHash('md5')
    .update(merchant_secret)
    .digest('hex')
    .toUpperCase();
};

const secretHash = generateSecretHash();
console.log('Hashed Merchant Secret:', secretHash);

// Step 3: Generate the main MD5 signature
const generateMainSignature = () => {
  // Combine all parameters in the correct order
  const combinedString = 
    merchant_id +
    order_id +
    payhere_amount +
    payhere_currency +
    status_code +
    secretHash;

  console.log('String to be hashed:', combinedString);

  return crypto
    .createHash('md5')
    .update(combinedString)
    .digest('hex')
    .toUpperCase();
};

const md5sig = generateMainSignature();

// Final output
console.log('\nGenerated MD5 Signature:', md5sig);
console.log('\nUse this signature in your Postman tests as the "md5sig" parameter');