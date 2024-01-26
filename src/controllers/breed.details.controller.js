const BreedDetailsModel = require('../models/breed.details.model');

const breedDetailsModel = new BreedDetailsModel();

class BreedDetailsController {

    async getAllBreedDetails(req, res) {
        try {
            const {id} = req.params;
            const breedDetails = await breedDetailsModel.getAllBreedDetailsByBreedId(id);

            if (breedDetails) {
                res.status(404).send('Breed details not found for this id');
            } else {
                res.json(breedDetails);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Something went wrong!');
        }
    }

    async getBreedDetailsById(req, res) {
        try {
            const {id, detail_id} = req.params;
            const breedDetails = await breedDetailsModel.getBreedDetailsById(id, detail_id);

            if (breedDetails) {
                res.json(breedDetails);
            } else {
                res.status(404).send('Breed details not found');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Something went wrong!');
        }
    }

    async createBreedDetails(req, res) {
        try {
            const {id, detail_id} = req.params;
            const {name, size, temperament, popularity} = req.body;
            const breedDetailsExist = await breedDetailsModel.getBreedDetailsById(id, detail_id);

            if (breedDetailsExist) {
                res.status(400).send('Breed details already exist for this id');
            } else {
                const breedDetails = await breedDetailsModel.createBreedDetails(detail_id, name, size, temperament, popularity, id);
                res.json(breedDetails);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Something went wrong!');
        }
    }

    async updateBreedDetails(req, res) {
        try {
            const {id, detail_id} = req.params;
            const updatedFields = req.body
            const breedDetailsExist = await breedDetailsModel.getBreedDetailsById(id, detail_id);

            if (breedDetailsExist) {
                const updatedBreedDetails = await breedDetailsModel.updateBreedDetails(id, detail_id, updatedFields);
                res.json(updatedBreedDetails);
            } else {
                res.status(404).send('Breed details not found for this id!');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Something went wrong!');
        }
    }

    async deleteBreedDetails(req, res) {
        try {
            const {id, detail_id} = req.params;
            const breedDetailsExist = await breedDetailsModel.getBreedDetailsById(id, detail_id);

            if (breedDetailsExist) {
                const deletedBreedDetails = await breedDetailsModel.deleteBreedDetails(id, detail_id);
                res.json(deletedBreedDetails);
            } else {
                res.status(404).send('Breed details not found');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Something went wrong!');
        }
    }
}

module.exports = new BreedDetailsController();
