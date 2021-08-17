import routerx from 'express-promise-router';
import categoriaController from '../controllers/CategoriaController';
import auth from '../middlewares/auth';

const { check }  = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');

const router=routerx();

router.post('/add',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],auth.verifyAlmacenero,categoriaController.add);

router.get('/query',auth.verifyAlmacenero,categoriaController.query);
router.get('/list',auth.verifyAlmacenero,categoriaController.list);
router.get('/listSearch',auth.verifyAlmacenero,categoriaController.listSearch);

router.put('/update',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],auth.verifyAlmacenero,categoriaController.update);

router.delete('/remove',[
    check('_id', 'Id es obligatorio').not().isEmpty(),
    validarCampos
],auth.verifyAlmacenero,categoriaController.remove);

router.put('/activate',auth.verifyAlmacenero,categoriaController.activate);
router.put('/deactivate',auth.verifyAlmacenero,categoriaController.deactivate);

export default router;