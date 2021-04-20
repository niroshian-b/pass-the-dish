const express = require('express');

const router = express.Router();

const {
	getAllUsers,
	addUser,
	getUserByID,
	updateUser,
	deleteUser,
	getAllPosts,
	getPost,
	addPost,
} = require('../Handlers/dataHandlers.js');

router.get('/users', getAllUsers);
router.get('/users/:uid', getUserByID);
router.post('/users', addUser);
router.put('/users/:uid', updateUser);
router.delete('/users/:uid', deleteUser);

router.get('/posts', getAllPosts);
router.get('/posts/:uid', getPost);
router.post('/posts', addPost);

module.exports = router;
