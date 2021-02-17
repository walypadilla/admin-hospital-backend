const { response } = require('express');
const bcrypt = require('bcryptjs');

const { UserModel } = require('../models/index');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

// ============================================================
// login
// ============================================================
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

		res.status(200).json({
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

// ============================================================
// login Google
// ============================================================
const googleSingIn = async (req, res = response) => {
	const googleToken = req.body.token;

	try {
		// enviando el token a la funcion
		const { given_name, family_name, email, picture } = await googleVerify(
			googleToken
		);

		// verificar si ya existe un usuario con esa cuenta de email
		const usuarioDB = await UserModel.findOne({ email });
		// si usuario no existe
		if (!usuarioDB) {
			usuario = new UserModel({
				nombre: given_name,
				apellido: family_name,
				email,
				password: '@@@',
				img: picture,
				google: true,
			});
		} else {
			usuario = usuarioDB;
			usuario.google = true;
		}

		// Guardar en BD
		await usuario.save();

		// Generar el TOKEN - JWT
		const token = await generarJWT(usuario.id);

		res.status(200).json({
			ok: true,
			token,
		});
	} catch (error) {
		res.status(401).json({
			ok: false,
			msg: 'Token no es correcto.',
		});
	}
};

module.exports = {
	login,
	googleSingIn,
};
