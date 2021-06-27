var express = require('express');
var categoriaController = require('../controllers/CategoriaController');

var api = express.Router();

//Registrar categoria
api.post('/categoria/registrar',categoriaController.registrar);

//Obtener categoria por ID
api.get('/categoria/:id',categoriaController.obtener_categoria)

//Actualizar una categoria por ID
api.put('/categoria/editar/:id',categoriaController.editar);

//Eliminar una categoria por ID
api.delete('/categoria/eliminar/:id',categoriaController.eliminar);

//Filtrar datos
api.get('/categorias/:nombre?',categoriaController.listar);

module.exports = api;