const router = require('express').Router()
const userRouter = require('./userRoutes')
const thoughtRouter = require('./thoughtRoutes');
// appened /thoughts to all api routes inside the thoughtRoutes file
router.use('/thoughts', thoughtRouter);
// appened /users to all api routes inside the userRoutes file
router.use('/users', userRouter);

module.exports = router;