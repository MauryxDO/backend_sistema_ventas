import routerx from 'express-promise-router';
import personaController from '../controllers/PersonaController';
import auth from '../middlewares/auth';
const { check }  = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');

const router=routerx();

router.post('/add',[
    check('tipo_persona', 'El Rol es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos
],personaController.add);

router.get('/query',[
    check('_id', 'El valor no puede estar vacio').not().isEmpty(),
    validarCampos
],personaController.query);

router.get('/list',auth.verifyUsuario,personaController.list);

router.get('/listSearch',auth.verifyUsuario,personaController.listSearch);

router.get('/listClientes',auth.verifyUsuario,personaController.listClientes);

router.get('/listProveedores',auth.verifyUsuario,personaController.listProveedores);

router.put('/update',[
    check('tipo_persona', 'El Rol es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos
],personaController.update);

router.put('/updateEmail',personaController.updateEmail);

router.delete('/remove',[
    check('_id', 'Id es obligatorio').not().isEmpty(),
    validarCampos
],personaController.remove);

router.put('/activate',auth.verifyUsuario,personaController.activate);

router.put('/deactivate',auth.verifyUsuario,personaController.deactivate);

export default router;