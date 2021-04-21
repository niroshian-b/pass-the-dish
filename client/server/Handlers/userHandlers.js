const { admin, db } = require('../util/admin');
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

	const defaultAvatar = 'defaultAvatar.png';
	//Manually added access token from uploaded file on firebase
	const accessToken = '7906f442-bb29-40fd-9e2e-f01dcbca8b39';

	const newUser = {
		displayName: req.body.displayName,
		email: req.body.email,
		experience: req.body.experience,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		imageURL: `https://firebasestorage.googleapis.com/v0/b/${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}/o/${defaultAvatar}?alt=media&token=${accessToken}`,
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

const uploadUserImage = (req, res) => {
	//[TODO] should be able to update User display picture
};

const updateUser = (req, res) => {
	//[TODO] should be able to update User after the user has been registered
};

const deleteUser = (req, res) => {
	//[TODO] should be able to delete Users from the database
};

module.exports = {
	getAllUsers,
	addUser,
	getUserByID,
	updateUser,
	deleteUser,
	uploadUserImage,
};
