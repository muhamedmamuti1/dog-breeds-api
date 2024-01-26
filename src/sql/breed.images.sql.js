const breedImagesSql = {
    getAllBreedImagesByBreedId: 'SELECT * FROM images WHERE breed_id = $1 AND deleted_at IS NULL LIMIT $2 OFFSET $3',
    getBreedImagesById: 'SELECT * FROM images WHERE breed_id = $1 AND id = $2',
    createBreedImage: 'INSERT INTO images(id, url, breed_id) VALUES($1, $2, $3) RETURNING *',
    updateBreedImage: 'UPDATE images SET url = COALESCE($2, url), breed_id = COALESCE($3, breed_id), updated_at = NOW() WHERE id = $1 RETURNING *',
    deleteBreedImage: 'UPDATE images SET deleted_at = NOW() WHERE breed_id = $1 AND id = $2 RETURNING *',
    getRandomBreedImageByName: 'SELECT i.url FROM images i INNER JOIN breeds b on b.id = i.breed_id WHERE LOWER(b.name) = LOWER($1) ORDER BY RANDOM() LIMIT 1',
};

module.exports = {
    breedImagesQueries: breedImagesSql,
}
