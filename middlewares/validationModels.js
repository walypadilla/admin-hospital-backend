const { check } = require('express-validator');

// ================================================
// Validation fields the User Model Required
// ================================================
let validationUserModel = [
	check('nombre', 'El nombre es es obligatorio.').not().isEmpty(),
	check('apellido', 'El apellido es obligatorio.').not().isEmpty(),
	check('email', 'El email es obligatorio.').isEmail(),
	check('password', 'El password es obligatorio.').not().isEmail(),
];

// ================================================
// validando que tenga nombre y usuario
// ================================================
let validationUpdateUser = [
	check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
	check('email', 'El email es obligatorio.').isEmail(),
	check('role', 'El role es obligatorio.').not().isEmpty(),
];

// ================================================
// validando que el login tenga correo y password
// ================================================
let validationLogin = [
	check('email', 'El email es obligatorio.').isEmail(),
	check('password', 'El password es obligatorio.').not().isEmail(),
];

// ================================================
// validando que el login tenga token de google
// ================================================
let validationLoginGoogle = [
	check('password', 'El token de Google es obligatorio.').not().isEmail(),
];

// ================================================
// Validation fields the HOSPITAL MODEL Required
// ================================================
let validationHospitalModel = [
	check('nombre', 'El nombre del hospital es obligatorio.').not().isEmpty(),
	check('direccion', 'La direccion es obligatorio.').not().isEmpty(),
	check('telefono', 'El teléfono es obligatorio.').not().isEmpty(),
];

// ================================================
// Validation fields the DOCTOR MODEL Required
// ================================================
let validationDoctorModel = [
	check('nombre', 'El nombre del doctor es obligatorio.').not().isEmpty(),
	check('apellido', 'El apellido del doctor es obligatorio.').not().isEmpty(),
	check('email', 'El email es obligatorio.').isEmail(),
	check('hospital', 'El hospital id debe de ser válido.').isMongoId(),
];
module.exports = {
	validationUserModel,
	validationUpdateUser,
	validationLogin,
	validationLoginGoogle,
	validationHospitalModel,
	validationDoctorModel,
};
