const router = require('express').Router();
const animalRoutes = require('./animalRoutes.js');

router.use(animalRoutes);

module.exports = router;