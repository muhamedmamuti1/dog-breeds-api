const breedsSql = {
    getAllBreeds: 'SELECT * FROM breeds WHERE deleted_at IS NULL LIMIT $1 OFFSET $2',
    getBreedById: 'SELECT * FROM breeds WHERE id = $1',
    createBreed: 'INSERT INTO breeds(id, name) VALUES($1, $2) RETURNING *',
    updateBreed: 'UPDATE breeds SET name = COALESCE($2, name), updated_at = NOW() WHERE id = $1 RETURNING *',
    deleteBreed: 'UPDATE breeds SET deleted_at = NOW() WHERE id = $1 RETURNING *',
    searchBreed: "SELECT b.id, b.name AS breed, bd.name AS breed_type_name, bd.size, bd.temperament, bd.popularity\n" +
        "FROM breeds b\n" +
        "         INNER JOIN breed_details bd ON bd.breed_id = b.id\n" +
        "WHERE b.deleted_at IS NULL\n" +
        "    AND bd.deleted_at IS NULL\n" +
        "    AND (bd.size IS NULL OR LOWER(CAST(bd.size AS TEXT)) LIKE LOWER($1))\n" +
        "   OR (bd.temperament IS NULL OR LOWER(bd.temperament) LIKE LOWER($2))\n" +
        "   OR (bd.popularity IS NULL OR LOWER(CAST(bd.popularity AS TEXT)) LIKE LOWER($3))",
    getBreedImagesById: 'SELECT url FROM images WHERE deleted_at IS NULL AND breed_id = $1',
    getBreedDetailsById: 'SELECT name, size, temperament, popularity FROM breed_details WHERE deleted_at IS NULL AND breed_id = $1',
    checkIfBreedIsDeleted: 'SELECT deleted_at FROM breeds WHERE id = $1',
};

module.exports = {
    breedQueries: breedsSql,
};
