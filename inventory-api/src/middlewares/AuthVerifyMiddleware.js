var jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let Token = req.headers['token'];

    if (!Token) {
        return res.status(401).json({status: "unauthorized", data: "TokenMissing"});
    }

    jwt.verify(Token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
            return res.status(401).json({status: "unauthorized", data: "InvalidOrExpiredToken"});
        }
        let email = decoded['data'];
        req.headers.email = email;
        next();
    })
}
