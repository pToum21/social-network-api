const { Thought, User } = require('../models');

//these controllers are the functionality for the userRoutes inside the routes folder
module.exports = {
    // get all users
    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (error) {
            console.log(error)
            res.status(500).json(err)
        }
    },
    // get single user by id
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
    // create a new user
    async addUser(req, res) {
        try {
            const user = await User.create(req.body)
            res.json(user)

        } catch (error) {
            console.log(error)
            res.status(500).json(err)
        }
    },
    // update a user thru a put
    async upDateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true },
            )

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' })
            }
            res.json(user)
        } catch (error) {
            console.log(error)
            res.status(500).json(err)
        }
    },
    // delete a user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId })

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' })
            }

            const thoughts = await Thought.deleteMany({ _id: { $in: user.thoughts } })

            res.json(user)
        } catch (error) {
            console.log(error)
            res.status(500).json(err)
        }
    },
    // add a friend to the friend away in user using a post
    async addFriend(req, res) {
        try {
            const friend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            )

            if (!friend) {
                return res.status(404).json({ message: 'No user with that ID' })
            }
            res.json(friend)

        } catch (error) {
            console.log(error)
            res.status(500).json(err)
        }
    },
    // remove a friend from the friend array using a delete
    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            )

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' })
            }

            res.json(user)

        } catch (error) {
            console.log(error)
            res.status(500).json(err)
        }
    }
};