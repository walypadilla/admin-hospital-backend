// =================================================================
// Subida de archivos
// Ruta: '/api/upload
// ==================================================================
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

const { validarJWT } = require('../middlewares/validar-jwt');
const { UploadsController } = require('../controllers/index');

const router = Router();

router.use(expressFileUpload());

router.put('/:tipo/:id', validarJWT, UploadsController.fileUpload);
router.get('/:tipo/:foto', UploadsController.getImagen);

module.exports = router;
