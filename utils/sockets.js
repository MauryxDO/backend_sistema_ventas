import auth from '../middlewares/auth';
import models from '../controllers/SocketsController';

exports.chatSocket = (socket)=>{

    const [ valido, _id ] = auth.verifyUsuario( socket.handshake.query['token']  );

            if ( !valido ) {
                console.log('socket no identificado');
                return socket.disconnect();
            }

            models.usuarioConectado( _id );

            // Unir al usuario a una sala de socket.io
            socket.join( _id );

            // Validar el JWT 
            // Si el token no es válido, desconectar

            // Saber que usuario está activo mediante el Id

            // Emitir todos los usuarios conectados
            this.io.emit( 'lista-usuarios',  models.getUsuarios() )

            //Socket join, id

            // Escuchar cuando el cliente manda un mensaje
            socket.on( 'mensaje-personal', async( payload ) => {
                const mensaje =  models.grabarMensaje( payload );
                console.log('mensaje almacenado en la base de datos', payload)
                this.io.to( payload.para ).emit( 'mensaje-personal', mensaje );
                this.io.to( payload.de ).emit( 'mensaje-personal', mensaje );
            });
            

            // Disconnect
            // Marcar en la BD que el usuario se desconecto
            // Emitir todos los usuarios conectados
            socket.on('disconnect', async() => {
                models.usuarioDesconectado( _id );
                this.io.emit( 'lista-usuarios',  models.getUsuarios() )
            })
            
}