const express = require('express');

const {
	getNutritionalInfo,
	postNutritionalInfo,
} = require('./Handlers/EdamamHandler');

const router = express.Router();

router.get('/', getNutritionalInfo);

router.post('/', postNutritionalInfo);

module.exports = router;
