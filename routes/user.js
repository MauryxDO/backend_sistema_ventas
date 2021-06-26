var express = require('express');
var userController = require('../controllers/UserController');

var api = express.Router();

api.post('/registrar',userController.registrar);

module.exports = api;