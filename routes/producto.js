var express = require('express');
var productoController = require('../controllers/ProductoController');
var multipart = require('connect-multiparty');
//Para que se acepte el archivo se requiere el multiparty
var path = multipart({uploadDir: './uploads/productos'})

var api = express.Router();

//registrar
api.post('/producto/registrar',path,productoController.registrar);
//Listar
api.get('/productos/:titulo?',productoController.listar);
//Editar producto
api.put('/productos/editar/:id',path,productoController.editar);
//obtener producto
api.get('/producto/registro/:id',productoController.obtener_producto);
//eliminar
api.delete('/producto/:id',productoController.eliminar);

//Aumentar stock
api.put('/producto/stock/:id',productoController.update_stock);

module.exports = api;