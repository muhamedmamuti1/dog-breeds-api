const BreedsModel = require('../models/breeds.model');
const BreedsDetailsModel = require('../models/breed.details.model');

const breedsModel = new BreedsModel();
const breedsDetailsModel = new BreedsDetailsModel();

class BreedsController {

    async getAllBreeds(req, res) {
        try {
            const {page = 1, pageSize = 10} = req.query;
            const offset = (page - 1) * pageSize;
            const breeds = await breedsModel.getAllBreeds(pageSize, offset);
            res.json(breeds);
        } catch (error) {
            console.error(error);
            res.status(500).send('Something went wrong!');
        }
    }

    async createBreed(req, res) {
        try {
            const {id} = req.params;
            const {name} = req.body;
            const breedExists = await breedsModel.getBreedById(id);

            if (breedExists) {
                res.status(400).send('Breed does exist!');
            } else {
                const breed = await breedsModel.createBreed(id, name);
                res.json(breed);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Something went wrong!');
        }
    }

    async updateBreed(req, res) {
        try {
            const {id} = req.params;
            const updatedFields = req.body
            const breedExists = await breedsModel.getBreedById(id);

            if (breedExists) {
                const updatedBreed = await breedsModel.updateBreed(id, updatedFields);
                res.json(updatedBreed);
            } else {
                res.json(404).send('Breed not found!');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Something went wrong!');
        }
    }

    async deleteBreed(req, res) {
        try {
            const {id} = req.params;
            const breedExists = await breedsModel.getBreedById(id);

            if (breedExists) {
                const deletedBreed = await breedsModel.deleteBreed(id);
                res.json(deletedBreed);
            } else {
                res.status(404).send('Breed not found!');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Something went wrong!');
        }
    }

    async searchBreed(req, res) {
        try {
            const {size, temperament, popularity} = req.query;

            const searchBreed = await breedsModel.searchBreed(size, temperament, popularity);

            if (searchBreed) {
                res.json(searchBreed)
            } else {
                res.status(404).send('Breed not found!');
            }
        } catch (error) {
            console.log(error);
            res.status(500).send("Something went wrong!");
        }
    }

    async getBreedDetailsById(req, res) {
        try {
            const {id} = req.params;
            const data = await breedsModel.getBreedDetailsById(id);

            if (!data.breedDetails) {
                return res.status(404).json({error: 'Breed not found'});
            }

            const breedData = {
                breed: data.breed.name,
                breed_details: data.breedDetails,
                images: data.images,
            };

            res.json(breedData);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }

    async getAllBreedsWithDetails(req, res) {
        try {
            const breeds = await breedsModel.getAllBreeds();
            const breedDetails = await breedsDetailsModel.getAllBreedDetails();

            // Object to store breed details by breed id
            const breedDetailsMap = {};

            breedDetails.forEach(detail => {
                const breedId = detail.breed_id;

                if (!breedDetailsMap[breedId]) {
                    breedDetailsMap[breedId] = [];
                }

                breedDetailsMap[breedId].push(detail.name);
            });

            const responsePayload = {
                message: {},
                status: 'success',
            };

            breeds.forEach(breed => {
                const breedId = breed.id;
                responsePayload.message[breed.name] = breedDetailsMap[breedId] || [];
            });

            res.json(responsePayload);
        } catch (error) {
            console.log(error)
            res.status(500).send(error);
        }
    }
}

module.exports = new BreedsController();
