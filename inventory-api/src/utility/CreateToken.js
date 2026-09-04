const jwt = require("jsonwebtoken");

const CreateToken = async (data) => {
    let expiresInSeconds = Number(process.env.JWT_EXPIRES_IN_SECONDS) || (24 * 60 * 60);
    let Payload = {exp: Math.floor(Date.now() / 1000) + expiresInSeconds, data: data};
    let Token = await jwt.sign(Payload, process.env.JWT_SECRET);
    return (Token);
}
module.exports = CreateToken
