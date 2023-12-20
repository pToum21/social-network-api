const router = require('express').Router()
// const userRouter = require('./userRoutes')
const thoughtRouter = require('./thoughtRoutes');

router.use('/thoughts', thoughtRouter);
// router.use('/users', userRouter);


module.exports = router;