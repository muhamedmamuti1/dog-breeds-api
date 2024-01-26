const express = require('express');
const breedImagesController = require('../controllers/breed.images.controller');
const authenticateUser = require("../auth/authenticate");
const authorizeUser = require("../auth/authorize");

const router = express.Router();

router.use(authenticateUser, authorizeUser(['CLIENT', 'ADMIN']));

router.get('/:id/images', breedImagesController.getAllBreedImages);
router.post('/:id/images/:image_id', breedImagesController.createBreedImage);
router.put('/:id/images/:image_id', breedImagesController.updateBreedImage);
router.delete('/:id/images/:image_id', breedImagesController.deleteBreedImage);
router.get('/:name/images/random', breedImagesController.getRandomBreedImage);
router.get('/:id/images/:image_id', breedImagesController.getBreedImagesById);

module.exports = router;
