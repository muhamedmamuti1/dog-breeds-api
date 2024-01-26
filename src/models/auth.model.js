const {Pool} = require("pg");
const config = require("../../config");
const {authQueries} = require("../sql/auth.sql");

const pool = new Pool(config.database);

class AuthModel {

    async getUserByUsername(username) {
        const result = await pool.query(authQueries.getUserByUsername, [username])
        return result.rows[0];
    }

}

module.exports = AuthModel;
