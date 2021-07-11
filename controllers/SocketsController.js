import models from '../models';

export default{
    
    usuarioConectado: async( uid ) => {

        const usuario = await models.Usuario.findById(uid);
        usuario.online = true;
        await usuario.save();
        
        return usuario;
    },
    
    usuarioDesconectado: async( uid ) => {
        const usuario = await models.Usuario.findById(uid);
        usuario.online = false;
        await usuario.save();
        
        return usuario;
    },
    
    
    getUsuarios: async() => {
    
        const usuarios = await models.Usuario
            .find()
            .sort('-online');
    
        return usuarios;
    },
    
    grabarMensaje: async( payload ) => {
        
        try {
            
            const mensaje = new models.Mensaje( payload );
            await mensaje.save();
    
            return mensaje;
    
        } catch (error) {
            console.log(error);
            return false;
        }
    
    }
}