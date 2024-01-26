const UserModel = require('../models/user.model');

const userModel = new UserModel();

class UserController {

    async getAllUsers(req, res) {
        try {
            const users = await userModel.getAllUsers();
            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }

    async getUserById(req, res) {
        try {
            const {id} = req.params;
            const user = await userModel.getUserById(id);

            if (!user) {
                return res.status(404).send('User not found');
            }

            res.json(user);

        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }

    async createUser(req, res) {
        try {
            const {id} = req.params;
            const {first_name, last_name, username, email, password, role} = req.body;
            const userExists = await userModel.getUserById(id);

            if (userExists) {
                return res.status(400).send("User with this id already exists!");
            }

            const user = await userModel.createUser(id, first_name, last_name, username, email, password, role);
            res.json(user);

        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }

    async updateUser(req, res) {
        try {
            const {id} = req.params;
            const updatedFields = req.body
            const userExists = await userModel.getUserById(id);

            if (!userExists) {
                return res.status(404).send('User not found!');
            }

            const updatedUser = await userModel.updateUser(id, updatedFields);
            res.json(updatedUser);

        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }

    async deleteUser(req, res) {
        try {
            const {id} = req.params;
            const userExists = await userModel.getUserById(id);
            const isDeleted = await userModel.checkIfUserIsDeleted(id);

            if (!userExists) {
                return res.status(404).send('User not found');
            }

            if (isDeleted) {
                return res.status(400).send('This user is already deleted!');
            }

            const deletedUser = await userModel.deleteUser(id);
            res.json(deletedUser);

        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = new UserController();
