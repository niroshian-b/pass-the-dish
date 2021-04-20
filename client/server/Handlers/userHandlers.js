const { db } = require('../util/admin');

require('dotenv').config();

const { queryDatabase } = require('../util/databaseHelpers');

//------------------
//USER HANDLERS
//------------------
const getAllUsers = async (req, res) => {
	try {
		const users = await queryDatabase('users');

		res.status(200).json({
			status: 200,
			message: 'got all Users',
			data: users,
		});
	} catch (err) {
		console.error(err);
		res.status(400).json({ status: 400, message: 'could not get users' });
	}
};

const getUserByID = async (req, res) => {
	const uid = req.params.uid;
	let user = null;

	try {
		const users = await queryDatabase('users');
		user = users[uid];
		if (user) {
			res.status(200).json({
				status: 200,
				message: `found user with ${uid}`,
				data: user,
			});
		} else {
			res.status(404).json({
				status: 404,
				message: `could not find user with ${uid}`,
			});
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({
			status: 500,
			message: err.message,
		});
	}
};

const addUser = async (req, res) => {
	const uid = req.body.uid;
	const usersRef = db.ref('users');

	const newUser = {
		displayName: req.body.displayName,
		email: req.body.email,
		experience: req.body.experience,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		uid: req.body.uid,
	};
	//[TODO] should add better validation when adding users, so that user data cannot be manipulated by sending post requests
	usersRef
		.child(uid)
		.set(newUser)
		.then(() => {
			res.status(200).json({
				status: 200,
				data: newUser,
				message: 'new user',
			});
		});
};

const updateUser = (req, res) => {
	//[TODO] should be able to update User after the User
};

const deleteUser = (req, res) => {};

module.exports = {
	getAllUsers,
	addUser,
	getUserByID,
	updateUser,
	deleteUser,
};
