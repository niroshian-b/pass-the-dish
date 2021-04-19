const users = require('../data/sampleUsers.json');

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
const rootRef = db.ref('passthedishes-dev-default-rtdb');

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

const getAllUsers = async (req, res) => {
	const users = await queryDatabase('users');
	res.status(200).json({
		status: 200,
		message: 'got all Users',
		data: users,
	});
};

const getUserByEmail = (req, res) => {};

const addUser = async (req, res) => {
	const uid = req.params.uid;
	const appUsersRef = rootRef.child('users');

	appUsersRef
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

const editUser = (req, res) => {};

const deleteUser = (req, res) => {};

module.exports = {
	getAllUsers,
	addUser,
	getUserByEmail,
	editUser,
	deleteUser,
};
