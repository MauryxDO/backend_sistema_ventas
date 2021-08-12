import routerx from 'express-promise-router';
import usuarioController from '../controllers/UsuarioController';
import auth from '../middlewares/auth';
const { check }  = require('express-validator');
const { validarCampos, validarid } = require('../middlewares/validarCampos');

const router=routerx();

//Ruta registrar nuevo usuario, solo el administrador podra agregar nuevos usuarios al sistema con su respectivo rol
router.post('/add',auth.verifyAdministrador,usuarioController.add);

//Consultar usuarios solo el administrador
router.get('/query',auth.verifyAdministrador,usuarioController.query);

//traer usuaris administrador
router.get('/list',auth.verifyAdministrador,usuarioController.list);

//actualizar usuarios solo administrador
router.put('/update',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos
],auth.verifyAdministrador,usuarioController.update);

//eliminar usuarios solo administrador
router.delete('/remove',[
    check('_id', 'Id es obligatorio').not().isEmpty(),
    validarCampos
],auth.verifyAdministrador,usuarioController.remove);

//Habilitar usuario administrador
router.put('/activate',auth.verifyAdministrador,usuarioController.activate);

//Inhabilitar usuario rol administrador
router.put('/deactivate',auth.verifyAdministrador,usuarioController.deactivate);

//Login usuarios
router.post('/login',usuarioController.login);

//Recuperar contraseña
router.put('/recuperar',usuarioController.forgotPassword);

//Crear nueva contraseña
router.put('/newPassword',auth.verifyUsuario,usuarioController.newPassword);

export default router;