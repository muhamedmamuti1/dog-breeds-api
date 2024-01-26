const authSql = {
    getUserByUsername: 'SELECT * FROM users WHERE username = $1 AND deleted_at IS NULL',
}

module.exports = {
    authQueries: authSql,
}
