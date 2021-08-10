const router = require('express').Router();
const userRoutes = require('./userroutes');
//const playRoutes = require('./playroutes');
//const platformRoutes = require('./platformroutes');
//const gameRoutes = require('./gameroutes');

router.use('/users', userRoutes);
//router.use('/plays', playRoutes);
//router.use('/platforms', platformRoutes);
//router.use('/games', gameRoutes);

module.exports = router;
