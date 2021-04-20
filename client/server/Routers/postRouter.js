const express = require('express');

const router = express.Router();

const {
	getAllPosts,
	getPost,
	addPost,
} = require('../Handlers/postHandlers.js');

router.get('/', getAllPosts);
router.get('/:uid', getPost);
router.post('/', addPost);

module.exports = router;
