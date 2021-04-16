const express = require('express');

const router = express.Router();

const {
	getAllUsers,
	addUser,
	getUserById,
	editUser,
	deleteUser,
} = require('../Handlers/userHandlers.js');

router.get('/all', getAllUsers);
router.get('/:_id', getUserById);
router.post('/:_id', addUser);
router.put('/:_id', editUser);
router.delete('/:_id', deleteUser);

module.exports = router;
