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
        await pool.query(userQueries.createUser, [id, firstName, lastName, username, email, password, role]);
    }

    async updateUser(id, updatedFields) {
        const {first_name, last_name, username, email, password, role} = updatedFields;

        await pool.query(userQueries.updateUser, [id, first_name, last_name, username, email, password, role]);
    }

    async deleteUser(id) {
        await pool.query(userQueries.deleteUser, [id]);
    }

    async checkIfUserIsDeleted(id) {
        const result = await pool.query(userQueries.checkIfUserIsDeleted, [id]);
        return result.rows[0];
    }
}

module.exports = UserModel;
