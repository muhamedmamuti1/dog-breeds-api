const {Pool} = require('pg');
const config = require('../../config');
const {breedQueries} = require("../sql/breeds.sql");

const pool = new Pool(config.database);

class BreedsModel {

    async getAllBreeds(limit, offset) {
        const result = await pool.query(breedQueries.getAllBreeds, [limit, offset]);
        return result.rows;
    }

    async createBreed(id, name) {

        const result = await pool.query(breedQueries.createBreed, [id, name]);
        return result.rows[0];
    }

    async updateBreed(id, updatedFields) {
        const {name} = updatedFields;

        const result = await pool.query(breedQueries.updateBreed, [id, name]);
        return result.rows[0];
    }

    async deleteBreed(id) {
        const result = await pool.query(breedQueries.deleteBreed, [id]);
        return result.rows[0];
    }

    async searchBreed(size, temperament, popularity) {
        const result = await pool.query(breedQueries.searchBreed, [size, temperament, popularity]);
        return result.rows[0];
    }

    async getBreedById(id) {
        const result = await pool.query(breedQueries.getBreedById, [id]);
        return result.rows[0];
    }

    async getBreedDetailsById(id) {
        try {
            const breed = await pool.query(breedQueries.getBreedById, [id]);
            const breedDetails = await pool.query(breedQueries.getBreedDetailsById, [id]);
            const breedImages = await pool.query(breedQueries.getBreedImagesById, [id]);
            return {
                breed: breed.rows[0],
                breedDetails: breedDetails.rows.map(row => ({
                    name: row.name,
                    size: row.size,
                    temperament: row.temperament,
                    popularity: row.popularity,
                })),
                images: breedImages.rows.map(row => row.url),
            };
        } catch (error) {
            throw error;
        }
    }

    async checkIfBreedIsDeleted(id) {
        const result = await pool.query(breedQueries.checkIfBreedIsDeleted, [id]);
        return result.rows[0];
    }
}

module.exports = BreedsModel;
