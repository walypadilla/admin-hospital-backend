const { response } = require('express');
const bcrypt = require('bcryptjs');

const { UserModel } = require('../models/index');
const { generarJWT } = require('../helpers/jwt');

// ================================================
// login
// ================================================
const login = async (req, res = response) => {
	const { email, password } = req.body;

	try {
		// Verificar email
		const usuarioDB = await UserModel.findOne({ email });

		if (!usuarioDB) {
			return res.status(404).json({
				ok: false,
				msg: 'Email no encontrado',
			});
		}

		// Verificar contraseña
		const validPassword = bcrypt.compareSync(password, usuarioDB.password);
		if (!validPassword) {
			return res.status(400).json({
				ok: false,
				msg: 'Contraseña no válida',
			});
		}

		// Generar el TOKEN - JWT
		const token = await generarJWT(usuarioDB.id);

		res.json({
			ok: true,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Hable con el administrador',
		});
	}
};

module.exports = {
	login,
};
