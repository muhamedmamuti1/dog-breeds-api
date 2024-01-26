const userSql = {
    getAllUsers: 'SELECT * FROM users WHERE deleted_at IS NULL;',
    getUserById: 'SELECT * FROM users WHERE id = $1',
    createUser: 'INSERT INTO users(id, first_name, last_name, username, email, password, role) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    updateUser: 'UPDATE users SET first_name = COALESCE($2, first_name), last_name = COALESCE($3, last_name), username = COALESCE($4, username), email = COALESCE($5, email), password = COALESCE($6, password), role = COALESCE($7, role), updated_at = NOW() WHERE id = $1 RETURNING *',
    deleteUser: 'UPDATE users SET deleted_at = NOW() WHERE id = $1 RETURNING *',
};

module.exports = {
    userQueries: userSql,
};
