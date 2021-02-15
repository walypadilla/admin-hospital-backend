// =================================================================
// Doctor
// Ruta: '/api/todo/:busqueda
// ==================================================================
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { SearchController } = require('../controllers/index');

const router = Router();

router.get('/:busqueda', validarJWT, SearchController.getTodo);
router.get(
	'/coleccion/:tabla/:busqueda',
	validarJWT,
	SearchController.getCollectionDocuments
);

module.exports = router;
