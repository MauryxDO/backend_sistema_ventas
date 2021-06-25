var mongoose = require('mongoose')
var Schema = mongoose.Schema;

// crear Schema para customers
var ClienteSchema = Schema({
    nombres: String,
    correo: String,
    puntos: Number,
    
});

module.exports = mongoose.model('cliente',ClienteSchema);