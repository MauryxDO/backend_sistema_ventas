var mongoose = require('mongoose')
var Schema = mongoose.Schema;

// crear Schema para customers
var DetalleVentaSchema = Schema({
    idproducto: {type: Schema.ObjectId, ref: 'producto'},
    cantidad: Number,
});

module.exports = mongoose.model('detalleventa',DetalleVentaSchema);