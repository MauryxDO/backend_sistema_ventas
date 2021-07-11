import routerx from 'express-promise-router';
import usuarioController from '../controllers/UsuarioController';
import auth from '../middlewares/auth';

const router=routerx();

//Ruta registrar nuevo usuario, solo el administrador podra agregar nuevos usuarios al sistema con su respectivo rol
router.post('/add',auth.verifyAdministrador,usuarioController.add);

//Consultar usuarios solo el administrador
router.get('/query',auth.verifyAdministrador,usuarioController.query);

//traer usuaris administrador
router.get('/list',auth.verifyAdministrador,usuarioController.list);

//actualizar usuarios solo administrador
router.put('/update',auth.verifyAdministrador,usuarioController.update);

//eliminar usuarios solo administrador
router.delete('/remove',auth.verifyAdministrador,usuarioController.remove);

//Habilitar usuario administrador
router.put('/activate',auth.verifyAdministrador,usuarioController.activate);

//Inhabilitar usuario rol administrador
router.put('/deactivate',auth.verifyAdministrador,usuarioController.deactivate);


router.post('/login',usuarioController.login);

export default router;