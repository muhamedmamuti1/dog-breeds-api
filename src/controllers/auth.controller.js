const AuthModel = require('../models/auth.model');
const authModel = new AuthModel();
const jwt = require('jsonwebtoken');
const {secret} = require('../../config.js');

class AuthController {
    async authController(req, res) {
        const {username, password} = req.body;
        const users = await authModel.getUsers();

        const user = users.find(u => u.username === username);

        if (!user) {
            return res.status(401).json({message: 'Invalid username or password.'});
        }

        const token = jwt.sign({id: user.id, username: user.username, role: user.role}, secret, {
            expiresIn: '1h',
        });

        res.json({token});
    }
}

module.exports = new AuthController();