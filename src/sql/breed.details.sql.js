const breedDetailsSql = {
    getAllBreedDetailsByBreedId: 'SELECT * FROM breed_details WHERE breed_id = $1 AND deleted_at IS NULL',
    getBreedDetailsById: 'SELECT * FROM breed_details WHERE breed_id = $1 AND id = $2',
    createBreedDetails: 'INSERT INTO breed_details(id, name, size, temperament, popularity, breed_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
    updateBreedDetails: 'UPDATE breed_details SET name = COALESCE($2, name), size = COALESCE($3, size), temperament = COALESCE($4, temperament), popularity = COALESCE($5, popularity), breed_id = COALESCE($6, breed_id), updated_at = NOW() WHERE id = $1 RETURNING *',
    deleteBreedDetails: 'UPDATE breed_details SET deleted_at = NOW() WHERE breed_id = $1 AND id = $2 RETURNING *',
    getAllBreedDetails: 'SELECT * FROM breed_details WHERE deleted_at IS NULL',
    checkIfBreedDetailsAreDeleted: 'SELECT deleted_at FROM breed_details WHERE breed_id = $1 AND id = $2',
};

module.exports = {
    breedDetailsQueries: breedDetailsSql,
}
