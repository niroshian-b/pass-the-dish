const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fetch = require('node-fetch');

require('dotenv').config();
const PORT = 4000;

express()
	.use(function (req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header(
			'Access-Control-Allow-Methods',
			'OPTIONS, HEAD, GET, PUT, POST, DELETE'
		);
		res.header(
			'Access-Control-Allow-Headers',
			'Origin, X-Requested-With, Content-Type, Accept'
		);
		next();
	})
	.use(morgan('tiny'))
	.use(bodyParser.json())

	.get('/nutritionalInfo/:title/:recipe/:ingr', async (req, res) => {
		const applicationID = process.env.EDAMAM_APPLICATION_ID;
		const applicationKey = process.env.EDAMAM_APPLICATION_KEY;

		const ingr = req.params.ingr.split('!');

		const body = {
			title: req.params.title,
			prep: req.params.recipe,
			ingr,
		};

		const nutritionalInfo = await fetch(
			`https://api.edamam.com/api/nutrition-details?app_id=${applicationID}&app_key=${applicationKey}`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			}
		)
			.then((res) => res.json())
			.then((json) => console.log(json));

		return res.send(nutritionalInfo);
	})
	.get('*', (req, res) =>
		res.status(400).json('Error, you took a wrong turn!')
	)
	.listen(PORT, () => console.info(`Listening on port ${PORT}`));
