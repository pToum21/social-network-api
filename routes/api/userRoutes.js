const router = require('express').Router();
const { User, Thought } = require('../../models');

const
    {

        getUsers,
        getUser,
        addUser,
        upDateUser,
        deleteUser,
        addFriend,
        deleteFriend

    } = require('../../controllers/userController');

router.route('/')
.get(getUsers)
.post(addUser);

router.route('/:userId')
.get(getUser)
.put(upDateUser)
// .delete(deleteUser);

// router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);



module.exports = router;