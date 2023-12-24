const router = require('express').Router();
const { User, Thought } = require('../../models');
const
    {
        // create the name of the functions used inside controllers
        getThoughts,
        addThoughts,
        getSingleThought,
        updateThought,
        deleteThought,
        addReaction,
        deleteReaction,
    } = require('../../controllers/thoughtController');
    
router.route('/')
    .get(getThoughts)
    .post(addThoughts);

router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);
    

router.route('/:thoughtId/reactions/')
    .post(addReaction)


router.route('/:thoughtId/reactions/:reactionId')    
    .delete(deleteReaction);

module.exports = router;