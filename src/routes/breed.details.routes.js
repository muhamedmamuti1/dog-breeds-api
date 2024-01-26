const express = require('express');
const breedDetailsController = require('../controllers/breed.details.controller');
const authenticateUser = require("../auth/authenticate");
const authorizeUser = require("../auth/authorize");

const router = express.Router();

router.use(authenticateUser, authorizeUser(['CLIENT', 'ADMIN']));

router.get('/:id/details', breedDetailsController.getAllBreedDetails);
router.get('/:id/details/:detail_id', breedDetailsController.getBreedDetailsById);
router.post('/:id/details/:detail_id', breedDetailsController.createBreedDetails);
router.put('/:id/details/:detail_id', breedDetailsController.updateBreedDetails);
router.delete('/:id/details/:detail_id', breedDetailsController.deleteBreedDetails);

module.exports = router;
