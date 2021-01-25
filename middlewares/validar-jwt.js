const jwt = require('jsonwebtoken');
const { SECRET_KEY_JWT } = require('../config/env.config');

// ================================================
// Validation JasonWebToken
// ================================================
const validarJWT = (req, res, next) => {
	// leer el token
	const token = req.header('x-token');

	if (!token) {
		return res.status(401).json({
			ok: false,
			msg: 'No hay token en la petición.',
		});
	}

	// verificando el token
	try {
		const { uid } = jwt.verify(token, SECRET_KEY_JWT);

		req.uid = uid;

		next();
	} catch (error) {
		return res.status(401).json({
			ok: false,
			msg: 'Token no válido.',
		});
	}
};

module.exports = {
	validarJWT,
};
