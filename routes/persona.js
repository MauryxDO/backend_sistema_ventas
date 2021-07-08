import routerx from 'express-promise-router';
import personaController from '../controllers/PersonaController';
import auth from '../middlewares/auth';
const router=routerx();

router.post('/add',personaController.add);
router.get('/query',personaController.query);
router.get('/list',auth.verifyUsuario,personaController.list);
router.get('/listClientes',auth.verifyUsuario,personaController.listClientes);
router.get('/listProveedores',auth.verifyUsuario,personaController.listProveedores);
router.put('/update',personaController.update);
router.delete('/remove',personaController.remove);
router.put('/activate',auth.verifyUsuario,personaController.activate);
router.put('/deactivate',auth.verifyUsuario,personaController.deactivate);

export default router;