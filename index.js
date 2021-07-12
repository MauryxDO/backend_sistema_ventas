import express from 'express';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import router from './routes';
import { Server } from 'socket.io';
import http from 'http';
import {chatSocket} from './utils/sockets';

//Conexión a la base de datos MongoDB
mongoose.Promise=global.Promise;

//const dbUrl = 'mongodb://localhost:27017/dbsistema';

//Conectando base de datos a nube
const dbUrl = 'mongodb+srv://MauryxDo:aQS8veRnSvhUOATC@mybd.hmuse.mongodb.net/dbsistema?retryWrites=true&w=majority'

//Para solucionar los errores de mongo se debe poner el codigo siguiente tuve algunos problemas pero se soluciono xD
mongoose.connect(dbUrl,
    {
    useCreateIndex:true,
    useNewUrlParser: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false})
.then(mongoose => console.log('Conectado a la Nube'))
.catch(err => console.log(err));

const app = express();

//Cors
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')))


//Rutas
app.use('/api',router);

//Puerto
app.set('port',process.env.PORT || 5000);
/*app.listen(app.get('port'),()=>{
    console.log('server on port ' + app.get('port'));
});*/


//Server
const server = http.createServer(app).listen(app.get('port'), ()=>{
    console.log("Conectado al puerto: " + app.get('port'));
})

//configuranco sockets
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

io.on('connection', (socket)=>{
    console.log('Cliente conectado');
    chatSocket(socket);
})

