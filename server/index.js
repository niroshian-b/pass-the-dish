const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const PORT = 4000;

express()
	.use(morgan('tiny'))
	.use(express.static('./server/assets'))
	.use(bodyParser.json())
	.use(express.urlencoded({ extended: false }))
	.use('/', express.static(__dirname + '/'))
	.get('*', (req, res) =>
		res.status(400).json('Error, you took a wrong turn!')
	)
	.listen(PORT, () => console.info(`Listening on port ${PORT}`));
