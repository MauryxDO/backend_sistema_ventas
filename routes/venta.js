import routerx from 'express-promise-router';
import ventaController from '../controllers/VentaController';
import auth from '../middlewares/auth';

const { check }  = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');

const router=routerx();

router.post('/add',[
    check('tipo_comprobante', 'El tipo de comprobante es necesario').not().isEmpty(),
    check('serie_comprobante', 'El número de comprobante es requerido').not().isEmpty(),
    check('total', 'Este campo no puede estar vacio').not().isEmpty(),
    validarCampos
],auth.verifyVendedor,ventaController.add);
router.get('/query',auth.verifyVendedor,ventaController.query);
router.get('/list',auth.verifyVendedor,ventaController.list);
router.get('/listSearch',auth.verifyVendedor,ventaController.listSearch);
router.put('/activate',auth.verifyVendedor,ventaController.activate);
router.put('/deactivate',auth.verifyVendedor,ventaController.deactivate);
router.get('/grafico',auth.verifyAlmacenero,ventaController.grafico);
router.get('/consulta',auth.verifyAlmacenero,ventaController.consultaFechas);
export default router;