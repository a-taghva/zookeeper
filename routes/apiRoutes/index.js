const router = require('express').Router();
const animalRoutes = require('./animalRoutes.js');
const zookeepersRoutes = require('./zookeepersRoutes');

router.use(animalRoutes);
router.use(zookeepersRoutes);

module.exports = router;