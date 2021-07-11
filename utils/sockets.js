import auth from '../middlewares/auth';
import models from '../controllers/SocketsController';

exports.chatSocket = (socket)=>{

    const [ valido, uid ] = auth.verifyUsuario( socket.handshake.query['token']  );

            if ( !valido ) {
                console.log('socket no identificado');
                return socket.disconnect();
            }

            models.usuarioConectado( uid );

            // Unir al usuario a una sala de socket.io
            socket.join( uid );

            // TODO: Validar el JWT 
            // Si el token no es válido, desconectar

            // TODO: Saber que usuario está activo mediante el UID

            // TODO: Emitir todos los usuarios conectados
            this.io.emit( 'lista-usuarios',  models.getUsuarios() )

            // TODO: Socket join, uid

            // TODO: Escuchar cuando el cliente manda un mensaje
            socket.on( 'mensaje-personal', async( payload ) => {
                const mensaje =  models.grabarMensaje( payload );
                this.io.to( payload.para ).emit( 'mensaje-personal', mensaje );
                this.io.to( payload.de ).emit( 'mensaje-personal', mensaje );
            });
            

            // TODO: Disconnect
            // Marcar en la BD que el usuario se desconecto
            // TODO: Emitir todos los usuarios conectados
            socket.on('disconnect', async() => {
                models.usuarioDesconectado( uid );
                this.io.emit( 'lista-usuarios',  models.getUsuarios() )
            })
            
}