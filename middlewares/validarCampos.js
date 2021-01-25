const { response } = require('express');
const { validationResult } = require('express-validator');

// ================================================
// Validation flieds not empy
// ================================================
const validarCampos = (req, res = response, next) => {
	const errores = validationResult(req);
	// validando los campos del middleware y que errores no venga vacio
	if (!errores.isEmpty()) {
		return res.status(400).json({
			ok: false,
			errors: errores.mapped(),
		});
	}
	next();
};

module.exports = validarCampos;
