const express = require('express');
const router = express.Router();

//Controllers
const noteController = require('./controller');

router.post('/contarnotas', noteController.contarNotas);

module.exports = router;
