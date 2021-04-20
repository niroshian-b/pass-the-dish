const express = require('express');

const router = express.Router();

const {
	getAllUsers,
	addUser,
	getUserByID,
	updateUser,
	deleteUser,
} = require('../Handlers/userHandlers.js');

router.get('/', getAllUsers);
router.get('/:uid', getUserByID);
router.post('/', addUser);
router.put('/:uid', updateUser);
router.delete('/:uid', deleteUser);

module.exports = router;
