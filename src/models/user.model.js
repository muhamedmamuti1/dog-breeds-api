const {Pool} = require('pg');
const config = require('../../config');
const {userQueries} = require("../sql/user.sql");

const pool = new Pool(config.database);

class UserModel {

    async getAllUsers() {
        const result = await pool.query(userQueries.getAllUsers);
        return result.rows;
    }

    async getUserById(id) {
        const result = await pool.query(userQueries.getUserById, [id]);
        return result.rows[0];
    }

    async createUser(id, firstName, lastName, username, email, password, role) {

        const result = await pool.query(userQueries.createUser, [id, firstName, lastName, username, email, password, role]);
        return result.rows[0];
    }

    async updateUser(id, updatedFields) {
        const {first_name, last_name, username, email, password, role} = updatedFields;

        const result = await pool.query(userQueries.updateUser, [id, first_name, last_name, username, email, password, role]);
        return result.rows[0];
    }

    async deleteUser(id) {
        const result = await pool.query(userQueries.deleteUser, [id]);
        return result.rows[0];
    }

    async checkIfUserIsDeleted(id) {
        const result = await pool.query(userQueries.checkIfUserIsDeleted, [id]);
        return result.rows[0];
    }
}

module.exports = UserModel;
