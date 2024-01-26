const {Pool} = require('pg');
const config = require('../../config');
const {breedImagesQueries} = require("../sql/breed.images.sql");

const pool = new Pool(config.database);

class BreedImagesModel {

    async getAllBreedImages(breedId, limit, offset) {
        const result = await pool.query(breedImagesQueries.getAllBreedImagesByBreedId, [breedId, limit, offset]);
        return result.rows;
    }

    async createBreedImage(imageId, url, breedId) {

        const result = await pool.query(breedImagesQueries.createBreedImage, [imageId, url, breedId]);
        return result.rows[0];
    }

    async updateBreedImage(breedId, imageId, url) {

        const result = await pool.query(breedImagesQueries.updateBreedImage, [imageId, url, breedId]);
        return result.rows[0];
    }

    async deleteBreedImage(breedId, imageId) {
        const result = await pool.query(breedImagesQueries.deleteBreedImage, [breedId, imageId]);
        return result.rows[0];
    }

    async getRandomBreedImage(name) {
        const result = await pool.query(breedImagesQueries.getRandomBreedImageByName, [name]);
        return result.rows[0];
    }

    async getBreedImagesById(id, imageId) {
        const result = await pool.query(breedImagesQueries.getBreedImagesById, [id, imageId]);
        return result.rows[0];
    }
}

module.exports = BreedImagesModel;
