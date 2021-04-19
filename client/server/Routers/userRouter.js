const express = require('express');

const router = express.Router();

const {
	getAllUsers,
	addUser,
	getUserByID,
	editUser,
	deleteUser,
} = require('../Handlers/userHandlers.js');

router.get('/', getAllUsers);
router.get('/:uid', getUserByID);
router.post('/:uid', addUser);
router.put('/:uid', editUser);
router.delete('/:uid', deleteUser);

module.exports = router;
