// Returns true if the given OTP document (which must have a Mongoose
// "createdAt" timestamp) is older than the configured expiry window.
const IsOTPExpired = (otpDoc) => {
    let expiryMinutes = Number(process.env.OTP_EXPIRES_IN_MINUTES) || 10;
    let expiryMs = expiryMinutes * 60 * 1000;
    let createdAt = new Date(otpDoc.createdAt).getTime();
    return (Date.now() - createdAt) > expiryMs;
};
module.exports = IsOTPExpired;
