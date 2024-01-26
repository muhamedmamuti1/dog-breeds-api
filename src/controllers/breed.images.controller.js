const BreedImagesModel = require('../models/breed.images.model');

const breedImagesModel = new BreedImagesModel();

class BreedImagesController {

    async getAllBreedImages(req, res) {
        try {
            const {id} = req.params;
            const {page = 1, pageSize = 10} = req.query;
            const offset = (page - 1) * pageSize;
            const breedImages = await breedImagesModel.getAllBreedImages(id, pageSize, offset);

            if (breedImages) {
                res.json(breedImages);
            } else {
                res.status(404).send('Breed images not found for this id!');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Something went wrong!');
        }
    }

    async createBreedImage(req, res) {
        try {
            const {id, image_id} = req.params;
            const {url} = req.body;
            const breedImageExists = await breedImagesModel.getBreedImagesById(id, image_id);

            if (breedImageExists) {
                res.status(400).send('Breed image with this id already exists!');
            } else {
                const breedImages = await breedImagesModel.createBreedImage(image_id, url, id);
                res.json(breedImages);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Something went wrong!');
        }
    }

    async updateBreedImage(req, res) {
        try {
            const {id, image_id} = req.params;
            const {url} = req.body
            const breedImageExists = await breedImagesModel.getBreedImagesById(id, image_id);

            if (breedImageExists) {
                const updatedBreedImages = await breedImagesModel.updateBreedImage(id, image_id, url);
                res.json(updatedBreedImages);
            } else {
                res.status(404).send('Breed image not found!');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Something went wrong!');
        }
    }

    async deleteBreedImage(req, res) {
        try {
            const {id, image_id} = req.params;
            const breedImageExists = await breedImagesModel.getBreedImagesById(id, image_id);

            if (breedImageExists) {
                const deletedBreedImages = await breedImagesModel.deleteBreedImage(id, image_id);
                res.json(deletedBreedImages);
            } else {
                res.status(404).send('Breed image not found');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Something went wrong!');
        }
    }

    async getRandomBreedImage(req, res) {
        try {
            const {name} = req.params;
            const randomBreedImage = await breedImagesModel.getRandomBreedImage(name);

            res.json(randomBreedImage);
        } catch (error) {
            console.error(error);
            res.status(500).send('Something went wrong!');
        }
    }

    async getBreedImagesById(req, res) {
        try {
            const {id, image_id} = req.params;
            const breedImagesById = await breedImagesModel.getBreedImagesById(id, image_id);

            if (breedImagesById) {
                res.json(breedImagesById);
            } else {
                res.status(404).send('Breed images not found!');
            }
        } catch (error) {
            console.log(error)
            res.status(500).send(error);
        }
    }
}

module.exports = new BreedImagesController();
