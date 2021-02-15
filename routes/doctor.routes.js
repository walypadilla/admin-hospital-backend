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
} = require('../controllers/doctor.contoller');

router.get('/', validarJWT, getDoctors);
router.post(
	'/',
	[validarJWT, validationDoctorModel, validarCampos],
	createDoctor
);
router.put('/:id', validarJWT, updateDoctor);
router.delete('/:id', validarJWT, deleteDoctor);

module.exports = router;
