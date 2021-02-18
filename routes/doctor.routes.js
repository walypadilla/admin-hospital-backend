// =================================================================
// Doctor
// Ruta: '/api/doctor
// ==================================================================
const { Router } = require('express');

const router = Router();

const { validarCampos } = require('../middlewares/index');
const { validationDoctorModel } = require('../middlewares/validationModels');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
	getDoctors,
	createDoctor,
	updateDoctor,
	deleteDoctor,
	getDoctorsDeleted,
	restoreDoctor,
} = require('../controllers/doctor.contoller');

router.get('/deleted/', validarJWT, getDoctorsDeleted);
router.get('/', validarJWT, getDoctors);
router.post(
	'/',
	[validarJWT, validationDoctorModel, validarCampos],
	createDoctor
);
router.put('/:id', validarJWT, updateDoctor);
router.put('/restore/:id', validarJWT, restoreDoctor);
router.delete('/:id', validarJWT, deleteDoctor);

module.exports = router;
