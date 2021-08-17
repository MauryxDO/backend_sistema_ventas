import routerx from 'express-promise-router';
import articuloController from '../controllers/ArticuloController';
import auth from '../middlewares/auth';

const { check }  = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');

const router=routerx();

router.post('/add',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'La categoria es obligatoria').not().isEmpty(),
    check('codigo', 'El codigo es necesario').not().isEmpty(),
    validarCampos
],auth.verifyAlmacenero,articuloController.add);

router.get('/query',auth.verifyAlmacenero,articuloController.query);
router.get('/list',auth.verifyAlmacenero,articuloController.list);
router.get('/listSearch',auth.verifyAlmacenero,articuloController.listSearch);

router.put('/update',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'La categoria es obligatoria').not().isEmpty(),
    check('codigo', 'El codigo es necesario').not().isEmpty(),
    validarCampos
],auth.verifyAlmacenero,articuloController.update);
router.delete('/remove',[
    check('_id', 'Id es obligatorio').not().isEmpty(),
    validarCampos
],auth.verifyAlmacenero,articuloController.remove);
router.put('/activate',auth.verifyAlmacenero,articuloController.activate);
router.put('/deactivate',auth.verifyAlmacenero,articuloController.deactivate);

export default router;