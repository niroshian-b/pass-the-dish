const express = require('express');

const router = express.Router();

const {
	getAllUsers,
	addUser,
	getUserByID,
	updateUser,
	deleteUser,
	uploadUserImage,
} = require('../Handlers/userHandlers.js');

router.get('/', getAllUsers);
router.get('/:uid', getUserByID);
router.post('/', addUser);
router.post('/image/:uid', uploadUserImage);
router.post('/:uid', updateUser);
router.delete('/:uid', deleteUser);

module.exports = router;
