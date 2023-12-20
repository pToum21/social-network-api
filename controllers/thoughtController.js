const { Thought, User } = require('../models');

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
    }
}