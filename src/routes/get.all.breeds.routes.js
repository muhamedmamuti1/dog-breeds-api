const express = require('express');
const breedController = require('../controllers/breeds.controller');
const authenticateUser = require("../auth/authenticate");
const authorizeUser = require("../auth/authorize");

const router = express.Router();

router.use(authenticateUser, authorizeUser(['CLIENT', 'ADMIN']));

router.get('/list/all', breedController.getAllBreedsWithDetails);

module.exports = router;
