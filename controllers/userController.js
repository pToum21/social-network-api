const { Thought, User } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (error) {
            console.log(error)
            res.status(500).json(err)
        }
    },
    async addUser(req, res){
        
    }
}