var mongoose = require('mongoose')
var Schema = mongoose.Schema;

// crear Schema para customers
var CategoriaSchema = Schema({
    titulo: String,
    descripcion: String,
    
});

module.exports = mongoose.model('categoria',CategoriaSchema);