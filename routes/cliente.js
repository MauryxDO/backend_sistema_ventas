var express = require('express');
var clienteController = require('../controllers/ClienteController');

var api = express.Router();

//FUNCIÓN REGISTRAR CLIENTE
api.post('/cliente', clienteController.registrar);
//FUNCIÓN REGISTRAR CLIENTE
api.put('/cliente/editar/:id', clienteController.editar);
//FUNCIÓN REGISTRAR CLIENTE
api.delete('/cliente/eliminar/:id', clienteController.eliminar);
module.exports = api;