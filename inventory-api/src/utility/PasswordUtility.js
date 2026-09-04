const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

const HashPassword = async (plainPassword) => {
    return bcrypt.hash(plainPassword, SALT_ROUNDS);
};

const ComparePassword = async (plainPassword, hashedPassword) => {
    if (!hashedPassword) return false;
    return bcrypt.compare(plainPassword, hashedPassword);
};

module.exports = {HashPassword, ComparePassword};
