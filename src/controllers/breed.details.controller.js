const BreedDetailsModel = require('../models/breed.details.model');

const breedDetailsModel = new BreedDetailsModel();

class BreedDetailsController {

    async getAllBreedDetails(req, res) {
        try {
            const {id} = req.params;
            const breedDetails = await breedDetailsModel.getAllBreedDetailsByBreedId(id);

            if (breedDetails === null) {
                return res.status(404).send('Breed details not found for this id');
            }

            res.json(breedDetails);

        } catch (error) {
            console.error(error);
            res.status(500).send('Something went wrong!');
        }
    }

    async getBreedDetailsById(req, res) {
        try {
            const {id, detail_id} = req.params;
            const breedDetails = await breedDetailsModel.getBreedDetailsById(id, detail_id);

            if (breedDetails === null) {
                return res.status(404).send('Breed details not found');
            }

            res.json(breedDetails);

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
                return res.status(400).send('Breed details already exist for this id');
            }

            const breedDetails = await breedDetailsModel.createBreedDetails(detail_id, name, size, temperament, popularity, id);
            res.json(breedDetails);

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

            if (!breedDetailsExist) {
                return res.status(404).send('Breed details not found for this id!');
            }

            const updatedBreedDetails = await breedDetailsModel.updateBreedDetails(id, detail_id, updatedFields);
            res.json(updatedBreedDetails);

        } catch (error) {
            console.error(error);
            res.status(500).send('Something went wrong!');
        }
    }

    async deleteBreedDetails(req, res) {
        try {
            const {id, detail_id} = req.params;
            const breedDetailsExist = await breedDetailsModel.getBreedDetailsById(id, detail_id);
            const isDeleted = await breedDetailsModel.checkIfBreedDetailsAreDeleted(id, detail_id);

            if (!breedDetailsExist) {
                return res.status(404).send('Breed details not found');
            }

            if (isDeleted) {
                return res.status(400).send('These breed details are already deleted!');
            }

            const deletedBreedDetails = await breedDetailsModel.deleteBreedDetails(id, detail_id);
            res.json(deletedBreedDetails);

        } catch (error) {
            console.error(error);
            res.status(500).send('Something went wrong!');
        }
    }
}

module.exports = new BreedDetailsController();
