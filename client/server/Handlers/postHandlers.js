const { db } = require('../util/admin');

require('dotenv').config();

const { queryDatabase } = require('../util/databaseHelpers');

//------------------
//POST HANDLERS
//------------------
const getAllPosts = async (req, res) => {
	try {
		const posts = await queryDatabase('posts');

		res.status(200).json({
			status: 200,
			message: 'got all Posts',
			data: posts,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ status: 500, message: 'could not get posts' });
	}
};

const getPost = (req, res) => {};
const addPost = (req, res) => {
	//req.body should have an object containing the image[optional], the ingredients list, and the time+date created, as well as the uid of the user who created the recipe
	const postsRef = db.ref('posts');
	//validate users Title
	if (req.body.title.trim() == '') {
		return res
			.status(400)
			.json({ status: 400, message: 'Title cannot be empty' });
	}
	//validate users ingredient list
	if (
		req.body.ingredients.length < 1 ||
		typeof req.body.ingredients != 'object'
	) {
		return res
			.status(400)
			.json({ status: 400, message: 'Check the ingredients' });
	}
	//validate users directions list
	if (
		req.body.directions.length < 1 ||
		typeof req.body.directions != 'object'
	) {
		return res
			.status(400)
			.json({ status: 400, message: 'Check the directions' });
	}

	const newPost = {
		image: req.body.image,
		title: req.body.title,
		ingredients: req.body.ingredients,
		directions: req.body.directions,
		likeCount: 1,
		commentCount: 0,
		uid: req.body.uid,
		datePosted: req.body.date,
	};

	postsRef.push(newPost).then(() => {
		res.status(200).json({
			status: 200,
			data: newPost,
			message: 'new post',
		});
	});
};

module.exports = {
	getAllPosts,
	getPost,
	addPost,
};
