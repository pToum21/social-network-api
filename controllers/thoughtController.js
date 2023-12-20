const { Thought, User } = require('../models');
const { findOne } = require('../models/User');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts)
        } catch (error) {
            console.log(error)
            res.status(500).json(err)
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
            if (!thought) {
                res.status(404).json({ message: 'no thought with that id found' })
            }
            res.json(thought)
        } catch (error) {
            console.log(error)
            res.status(500).json(err)
        }
    },
    async addThoughts(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id } },
                { new: true }
            )
            res.json(user)
        } catch (error) {
            console.log(error)
            res.status(500).json(err)
        }
    },
    async updateThought(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true },
            )
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json(thought)
        } catch (error) {
            console.log(error)
            res.status(500).json(err)
        }
    },
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId })

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought)
        } catch (error) {
            console.log(error)
            res.status(500).json(err)
        }
    },
    async addReaction(req, res) {

    },
    async deleteReaction(req, res) {

    },
};