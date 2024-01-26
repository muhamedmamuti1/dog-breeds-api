const express = require('express');
const userController = require('../controllers/user.controller');
const authenticateUser = require("../auth/authenticate");
const authorizeUser = require("../auth/authorize");

const router = express.Router();

router.use(authenticateUser);

router.get('/', authorizeUser(['CLIENT', 'ADMIN']), userController.getAllUsers);
router.get('/:id', authorizeUser(['CLIENT', 'ADMIN']), userController.getUserById);
router.post('/:id', authorizeUser(['ADMIN']), userController.createUser);
router.put('/:id', authorizeUser(['ADMIN']), userController.updateUser);
router.delete('/:id', authorizeUser(['ADMIN']), userController.deleteUser);

module.exports = router;
