const router = require('express').Router();
const apiRoutes = require('./api');
// append api in fron of all routes
router.use('/api', apiRoutes);

router.use((req, res) => {
    return res.send('Wrong route!');
});

module.exports = router;