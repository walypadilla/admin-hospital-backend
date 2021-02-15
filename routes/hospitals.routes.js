// =================================================================
// Hospitales
// Ruta: '/api/hospitales
// ==================================================================

const { Router } = require('express');

const router = Router();

const { validarCampos } = require('../middlewares/index');
const { validarJWT } = require('../middlewares/validar-jwt');

const { HospitalsController } = require('../controllers/index');

const { validationHospitalModel } = require('../middlewares/validationModels');

router.get('/', validarJWT, HospitalsController.getHospitals);
router.post(
	'/',
	[validarJWT, validationHospitalModel, validarCampos],
	HospitalsController.createHospital
);
router.put('/:id', validarJWT, HospitalsController.updateHospital);
router.delete('/:id', validarJWT, HospitalsController.deleteHospital);

module.exports = router;
