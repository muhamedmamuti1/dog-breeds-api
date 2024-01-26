const jwt = require('jsonwebtoken');
const {secret} = require('../../config.js');

function authenticateUser(req, res, next) {
    const token = req.header('token');

    if (!token) {
        return res.status(401).json({message: 'Access denied. No token provided.'});
    }

    try {
        req.user = jwt.verify(token, secret);
        next();
    } catch (ex) {
        res.status(400).json({message: 'Invalid token.'});
    }
}

module.exports = authenticateUser;
