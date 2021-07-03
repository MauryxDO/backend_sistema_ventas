import jwt from 'jsonwebtoken';
import models from '../models';

/*función para aplicaciones modernas funcionara siempre y cuando se tenga un token valido
    la función esta pensada para la aplicación moviles */
async function checkToken(token){
    let __id = null;
    try{
        const {_id}= await jwt.decode(token);
        __id = _id;
    } catch (e){
        return false;
    }
    //Si el usuario esta activo seguira teniendo acceso al sistema
    const user = await models.Usuario.findOne({_id:__id,estado:1});
    if (user){
        const token = jwt.sign({_id:__id},'clavesecretaparagenerartoken',{expiresIn:'1d'});
        return {token,rol:user.rol};
    } else {
        return false;
    }
}

export default {
    //genera token
    encode: async (_id) => {                    
        const token = jwt.sign({_id:_id},'clavesecretaparagenerartoken',{expiresIn: '1d'});//<< Tiempo de expiración del token
        return token;
    },
    //recibir token y verificar si esta correcto
    decode: async (token) => {
        try {
            const {_id} = await jwt.verify(token,'clavesecretaparagenerartoken');
            //Usuario Activo en estado, es decir que puede interactuar con el sistema
            const user = await models.Usuario.findOne({_id,estado:1});
            if (user){
                return user;
            } else{
                return false;
            }
        } catch (e){
            //si el token es valido generar un nuevo token
            const newToken = await checkToken(token);
            return newToken;
        }
    }
}