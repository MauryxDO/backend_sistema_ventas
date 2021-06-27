//Configuración para el renderizado de figuras
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = '03041200'

exports.createToken = function(user){
    var payload = {
        sub: user._id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        email: user.email,
        role:user.role,
        //Fecha de creación del token
        iat: moment().unix(),
        //se declara el tiempo de expiración del token
        exp: moment().add(30, 'days').unix(),

    }
    //se codidificaran todos los datos para la obtención de un token
    return jwt.encode(payload,secret)
}
