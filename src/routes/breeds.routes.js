const express = require('express');
const breedController = require('../controllers/breeds.controller');
const authenticateUser = require("../auth/authenticate");
const authorizeUser = require("../auth/authorize");

const router = express.Router();

router.use(authenticateUser, authorizeUser(['CLIENT', 'ADMIN']));

router.get('/', breedController.getAllBreeds);
router.post('/:id', breedController.createBreed);
router.put('/:id', breedController.updateBreed);
router.delete('/:id', breedController.deleteBreed);
router.get('/search', breedController.searchBreed);
router.get('/:id', breedController.getBreedDetailsById);

module.exports = router;
