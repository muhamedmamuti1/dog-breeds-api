const {Pool} = require("pg");
const config = require("../../config");
const {authQueries} = require("../sql/auth.sql");

const pool = new Pool(config.database);

class AuthModel {

    async getUsers() {
        const result = await pool.query(authQueries.getUsers)
        return result.rows;
    }

}

module.exports = AuthModel;
