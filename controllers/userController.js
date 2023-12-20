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
    async getUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .populate('thoughts')
                .populate('friends')
                .select('-__v')

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' })
            }

            res.json(user);
        } catch (error) {
            console.log(error)
            res.status(500).json(err)
        }
    },
    async addUser(req, res) {
        try {
            const user = await User.create(req.body)
            res.json(user)

        } catch (error) {
            console.log(error)
            res.status(500).json(err)
        }
    },

};