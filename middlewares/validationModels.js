const { check } = require('express-validator');

// ================================================
// Validation fields the User Model Required
// ================================================
let validationUserModel = [
	check('nombre', 'El nombre es es obligatorio.').not().isEmpty(),
	check('apellido', 'El apellido es es obligatorio.').not().isEmpty(),
	check('email', 'El email es obligatorio.').isEmail(),
	check('password', 'El password es es obligatorio.').not().isEmail(),
];

// ================================================
// validando que tenga nombre y usuario
// ================================================
let validationUpdateUser = [
	check('nombre', 'El nombre es es obligatorio.').not().isEmpty(),
	check('email', 'El email es obligatorio.').isEmail(),
	check('role', 'El role es obligatorio.').not().isEmpty(),
];

// ================================================
// validando que el login tenga correo y password
// ================================================
let validationLogin = [
	check('email', 'El email es obligatorio.').isEmail(),
	check('password', 'El password es es obligatorio.').not().isEmail(),
];

module.exports = { validationUserModel, validationUpdateUser, validationLogin };
