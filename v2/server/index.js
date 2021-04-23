const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const PORT = 4000;

const edamamRouter = require('./Routers/EdamamRouter');

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

	.use('/nutritionalInfo', edamamRouter)

	.get('*', (req, res) =>
		res.status(400).json('Error, you took a wrong turn!')
	)
	.listen(PORT, () => console.info(`Listening on port ${PORT}`));
