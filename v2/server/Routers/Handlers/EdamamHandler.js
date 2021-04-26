require('dotenv').config();
const axios = require('axios');

const applicationID = process.env.REACT_APP_EDAMAM_APPLICATION_ID;
const applicationKey = process.env.REACT_APP_EDAMAM_APPLICATION_KEY;

const postNutritionalInfo = async (req, res) => {
	const data = JSON.stringify(req.body);
	const options = {
		method: 'POST',
		url: `https://api.edamam.com/api/nutrition-details?app_id=${process.env.REACT_APP_EDAMAM_APPLICATION_ID}&app_key=${process.env.REACT_APP_EDAMAM_APPLICATION_KEY}`,
		headers: { 'content-type': 'application/json' },
		data,
	};

	let nutritionalInfo = await axios(options)
		.then((response) => response.data)
		.catch((err) => console.error(err));

	if (nutritionalInfo) {
		return res.status(200).json({ status: 200, data: nutritionalInfo });
	}
};

module.exports = {
	postNutritionalInfo,
};
