const admin = require('firebase-admin');

require('dotenv').config();

admin.initializeApp({
	credential: admin.credential.cert({
		type: 'service_account',
		project_id: process.env.FIREBASE_PROJECT_ID,
		private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
		private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
		client_email: process.env.FIREBASE_CLIENT_EMAIL,
		client_id: process.env.FIREBASE_CLIENT_ID,
		auth_uri: 'https://accounts.google.com/o/oauth2/auth',
		token_uri: 'https://oauth2.googleapis.com/token',
		auth_provider_x509_cert_url:
			'https://www.googleapis.com/oauth2/v1/certs',
		client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT,
	}),
	databaseURL: process.env.FB_DATABASE_URL,
});

const db = admin.database();

const queryDatabase = async (key) => {
	const ref = db.ref(key);
	let data;
	await ref.once(
		'value',
		(snapshot) => {
			data = snapshot.val();
		},
		(err) => {
			console.log(err);
		}
	);

	return data;
};

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
		res.status(400).json({
			status: 400,
			message: err.message,
		});
	}
};

const addUser = async (req, res) => {
	const uid = req.params.uid;
	const usersRef = db.ref('users');

	//[TODO] should add better validation when adding users, so that user data cannot be manipulated by sending post requests
	usersRef
		.child(uid)
		.set(req.body)
		.then(() => {
			res.status(200).json({
				status: 200,
				data: req.body,
				message: 'new user',
			});
		});
};

const updateUser = (req, res) => {
	//[TODO] should be able to update User after the User
};

const deleteUser = (req, res) => {};

//------------------
//POST HANDLERS
//------------------

module.exports = {
	getAllUsers,
	addUser,
	getUserByID,
	updateUser,
	deleteUser,
};
