const express = require('express');
const router = express.Router();
const { getHomeView } = require('../controllers/homeController');

router.get('/', getHomeView);

module.exports = router;
