const fetch = require('node-fetch');
require('dotenv').config();
let data;

const applicationID = process.env.EDAMAM_APPLICATION_ID;
const applicationKey = process.env.EDAMAM_APPLICATION_KEY;

const getNutritionalInfo = (req, res) => {
	res.status(200).json({ status: 200, data });
};

const postNutritionalInfo = async (req, res) => {
	const body = JSON.stringify(req.body);

	const nutritionalInfo = await fetch(
		`https://api.edamam.com/api/nutrition-details?app_id=${applicationID}&app_key=${applicationKey}`,
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body,
		}
	)
		.then((res) => res.json())
		.then((json) => console.log(json))
		.catch((err) => console.error(err));

	data = nutritionalInfo;
	return res.status(200).json({
		status: 200,
		message: 'success!',
	});
};

module.exports = {
	getNutritionalInfo,
	postNutritionalInfo,
};
