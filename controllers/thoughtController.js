const { json } = require('express');
const { Thought, User } = require('../models');

// tied back to thoughtRoutes in the routes folder
// each controller is inside of module.exports meaning all are exported
module.exports = {
    //get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    // get single thought by id
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
            if (!thought) {
                res.status(404).json({ message: 'no thought with that id found' })
            }
            res.json(thought)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    // create a thought thru a post 
    async addThoughts(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { username: req.body.username },
                { $addToSet: { thoughts: thought._id } },
                { new: true }
            )
            res.json(user)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    // update a thought thru a put
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
            res.status(500).json(error)
        }
    },
    // delete a thought thru a delete
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId })

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    // add a reaction to a thought using a post request
    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            )

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json(thought)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    // remove a reaction from a thought but running a delete request
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            )

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json({message: "delted"})
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
};