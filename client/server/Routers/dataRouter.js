const express = require('express');

const router = express.Router();

const {
	getAllUsers,
	addUser,
	getUserByID,
	updateUser,
	deleteUser,
} = require('../Handlers/dataHandlers.js');

router.get('users/', getAllUsers);
router.get('users/:uid', getUserByID);
router.post('users/:uid', addUser);
router.put('users/:uid', updateUser);
router.delete('users/:uid', deleteUser);

module.exports = router;
