const express = require('express');

const router = express.Router();

const {
	getAllUsers,
	addUser,
	getUserByEmail,
	editUser,
	deleteUser,
} = require('../Handlers/userHandlers.js');

router.get('/all', getAllUsers);
router.get('/:email', getUserByEmail);
router.post('/:uid', addUser);
router.put('/', editUser);
router.delete('/', deleteUser);

module.exports = router;
