export const payhereConfig = {
    merchantId: process.env.PAYHERE_MERCHANT_ID,
    merchantSecret: process.env.PAYHERE_MERCHANT_SECRET,
    sandbox: true,
    notifyUrl: process.env.PAYHERE_NOTIFY_URL
};

// Validate config on startup
if (!payhereConfig.merchantId || !payhereConfig.merchantSecret) {
    throw new Error('PayHere configuration is incomplete. Check your environment variables.');
}