const router = require('express').Router();
const userRoutes = require('./userRoutes');
const specRoutes = require('./specRoutes');

router.use('/specs', specRoutes);
router.use('/users', userRoutes);


module.exports = router;