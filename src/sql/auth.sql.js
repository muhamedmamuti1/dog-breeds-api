const authSql = {
    getUsers: 'SELECT * FROM users WHERE deleted_at IS NULL',
}

module.exports = {
    authQueries: authSql,
}
