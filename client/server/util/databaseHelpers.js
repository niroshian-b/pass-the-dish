exports.queryDatabase = async (key) => {
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
