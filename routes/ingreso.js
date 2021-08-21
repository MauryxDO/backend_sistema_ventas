import routerx from 'express-promise-router';
import ingresoController from '../controllers/IngresoController';
import auth from '../middlewares/auth';

const { check }  = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const router=routerx();

router.post('/add',[
    check('tipo_comprobante', 'El tipo de comprobante es necesario').not().isEmpty(),
    check('num_comprobante', 'El número de comprobante es requerido').not().isEmpty(),
    check('total', 'Este campo no puede estar vacio').not().isEmpty(),
    validarCampos
],auth.verifyAlmacenero,ingresoController.add);

router.get('/query',auth.verifyAlmacenero,ingresoController.query);
router.get('/list',auth.verifyAlmacenero,ingresoController.list);
router.get('/listSearch',auth.verifyAlmacenero,ingresoController.listSearch);
router.put('/activate',auth.verifyAlmacenero,ingresoController.activate);
router.put('/deactivate',auth.verifyAlmacenero,ingresoController.deactivate);
router.get('/grafico',auth.verifyAlmacenero,ingresoController.grafico);
router.get('/consulta',auth.verifyAlmacenero,ingresoController.consultaFechas);

export default router;