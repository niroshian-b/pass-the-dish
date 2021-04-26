const express = require('express');

const { postNutritionalInfo } = require('./Handlers/EdamamHandler');

const router = express.Router();

router.post('/', postNutritionalInfo);

module.exports = router;
