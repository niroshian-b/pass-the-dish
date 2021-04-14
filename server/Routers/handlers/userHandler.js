const users = require('../../data/sampleUsers.json');

const getAllUsers = (req, res) => {
	res.status(200).json({
		status: 200,
		message: 'got all Users',
		data: users,
	});
};

const getUserById = (req, res) => {
	const user = users.find((user) => {
		return Number(user._id) === Number(req.params._id);
	});

	if (user) {
		res.status(200).json({ status: 200, message: 'got user', data: user });
	} else {
		res.status(404).json({ status: 404, message: 'user not found' });
	}
};

const addUser = (req, res) => {};

const editUser = (req, res) => {};

const deleteUser = (req, res) => {};

module.exports = {
	getAllUsers,
	addUser,
	getUserById,
	editUser,
	deleteUser,
};
