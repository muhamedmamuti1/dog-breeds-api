const {Pool} = require('pg');
const config = require('../../config');
const {breedDetailsQueries} = require("../sql/breed.details.sql");

const pool = new Pool(config.database);

class BreedDetailsModel {

    async getAllBreedDetailsByBreedId(breedId) {
        const result = await pool.query(breedDetailsQueries.getAllBreedDetailsByBreedId, [breedId]);
        return result.rows;
    }

    async getBreedDetailsById(breedId, breedDetailId) {
        const result = await pool.query(breedDetailsQueries.getBreedDetailsById, [breedId, breedDetailId]);
        return result.rows[0];
    }

    async createBreedDetails(breedDetailId, name, size, temperament, popularity, breedId) {

        const result = await pool.query(breedDetailsQueries.createBreedDetails, [breedDetailId, name, size, temperament, popularity, breedId]);
        return result.rows[0];
    }

    async updateBreedDetails(breedId, breedDetailId, updatedFields) {
        const {name, size, temperament, popularity} = updatedFields;

        const result = await pool.query(breedDetailsQueries.updateBreedDetails, [breedDetailId, name, size, temperament, popularity, breedId]);
        return result.rows[0];
    }

    async deleteBreedDetails(breedId, breedDetailsId) {
        const result = await pool.query(breedDetailsQueries.deleteBreedDetails, [breedId, breedDetailsId]);
        return result.rows[0];
    }

    async getAllBreedDetails() {
        const result = await pool.query(breedDetailsQueries.getAllBreedDetails);
        return result.rows;
    }
}

module.exports = BreedDetailsModel;
