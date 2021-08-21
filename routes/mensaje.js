import routerx from 'express-promise-router';
import mensajeController from '../controllers/MensajeController';
import auth from '../middlewares/auth';

const router=routerx();

//Consultar mensajes solo el administrador
router.get('/de',auth.verifyUsuario,mensajeController.obtenerChat);

export default router;