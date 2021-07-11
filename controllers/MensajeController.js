import models from '../models';

export default{
    obtenerChat: async( req, res ) => {

        const miId = req.uid;
        const mensajesDe = req.params.de;
    
        const last30 = await models.Mensaje.find({
            $or: [
                { de: miId, para: mensajesDe },
                { de: mensajesDe, para: miId },
            ]
        })
        .sort({ createdAt: 'asc' })
        .limit(30);
    
    
    
        res.json({
            ok: true,
            mensajes: last30
        });
    
    
    }
}