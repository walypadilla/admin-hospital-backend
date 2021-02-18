const { response } = require('express');
const bcrypt = require('bcryptjs');

const { UserModel } = require('../models/index');
const { generarJWT } = require('../helpers/jwt');

// ================================================
// GetUsers -- ESTADO FALSE OR DELETED
// ================================================
const getUsersDeleted = async (req, res, next) => {
	const desde = Number(req.query.desde) || 0;

	// promise.all me permite correr de manera simultanea las 2 promesas
	const [usuarios, total] = await Promise.all([
		UserModel.find({ estado: false }, 'nombre apellido email role google img')
			.skip(desde)
			.limit(5),

		UserModel.countDocuments({ estado: false }),
	]);

	res.json({
		ok: true,
		usuarios,
		uid: req.uid,
		total,
	});
};

// ================================================
// GetUsers
// ================================================
const getUsers = async (req, res, next) => {
	const desde = Number(req.query.desde) || 0;

	// promise.all me permite correr de manera simultanea las 2 promesas
	const [usuarios, total] = await Promise.all([
		UserModel.find({ estado: true }, 'nombre apellido email role google img')
			.skip(desde)
			.limit(5),

		UserModel.countDocuments({ estado: true }),
	]);

	res.json({
		ok: true,
		usuarios,
		uid: req.uid,
		total,
	});
};

// ================================================
// CreateUser
// ================================================
const createUser = async (req, res = response, next) => {
	const { email, password } = req.body;

	try {
		// verificando si usuario existe
		const exitsEmail = await UserModel.findOne({ email: email });

		if (exitsEmail) {
			return res.status(400).json({
				ok: false,
				smg: 'El correo ya está registrado',
			});
		}

		const usuario = new UserModel(req.body);

		// encryptar contraseña
		const salt = bcrypt.genSaltSync();
		usuario.password = bcrypt.hashSync(password, salt);

		// guardando el usuario
		await usuario.save();

		// Generar el TOKEN - JWT
		const token = await generarJWT(usuario.id);
		res.json({
			usuario,
			token,
		});
	} catch (error) {
		console.log(error);

		res.status(500).json({
			ok: false,
			msg: 'Error inesperado... revisar logs',
		});
	}
};

// ================================================
// UpdateUser
// ================================================

const updateUser = async (req, res = response, next) => {
	//TODO: Validar token y comparar si el usuario es  correcto
	const uid = req.params.id;

	try {
		const usuarioDB = await UserModel.findById(uid);
		// validando si el usuario existe
		if (!usuarioDB) {
			res.status(404).json({
				ok: false,
				msg: 'No existe un usuario por ese id.',
			});
		}

		// eliminando password y email para no actualizarlos
		const { password, google, email, ...campos } = req.body;
		// si el usuario no actualiza el email se elimina
		if (usuarioDB.email !== email) {
			// verificar que el usuario no coloque un correo que ya esta registrado
			const existEmail = await UserModel.findOne({ email });
			if (existEmail) {
				return res.status(400).json({
					ok: false,
					msg: 'Ya existe un usuario con ese email.',
				});
			}
		}
		campos.email = email;

		const updateUser = await UserModel.findByIdAndUpdate(uid, campos, {
			new: true,
		});

		res.status(201).json({ ok: true, usuario: updateUser });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Error inesperado... revisar logs',
		});
	}
};

// ================================================
// Restore User
// ================================================
const restoreUser = async (req, res = response, next) => {
	const uid = req.params.id;

	try {
		const usuarioDB = await UserModel.findById(uid);
		// validando si el usuario existe
		if (!usuarioDB) {
			res.status(404).json({
				ok: false,
				msg: 'No existe un usuario por ese id.',
			});
		}
		// cambiando estado a true para indicar que restauraremos ese usuario
		usuarioDB.estado = true;

		const userRestored = await UserModel.findByIdAndUpdate(uid, usuarioDB, {
			new: true,
		});

		res.json({
			ok: true,
			msg: 'Usuario restaurado correctamente.',
			usuario: userRestored,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			smg: 'Error inesperado... revisar logs',
		});
	}
};
// ================================================
// DeleteUser
// ================================================
const deleteUser = async (req, res = response, next) => {
	const uid = req.params.id;

	try {
		const usuarioDB = await UserModel.findById(uid);
		// validando si el usuario existe
		if (!usuarioDB) {
			res.status(404).json({
				ok: false,
				msg: 'No existe un usuario por ese id.',
			});
		}
		// cambiando estado a false
		usuarioDB.estado = false;

		const userDeleted = await UserModel.findByIdAndUpdate(uid, usuarioDB, {
			new: true,
		});

		res.json({
			ok: true,
			msg: 'Usuario eliminado correctamente.',
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			smg: 'Error inesperado... revisar logs',
		});
	}
};

module.exports = {
	getUsersDeleted,
	getUsers,
	createUser,
	updateUser,
	restoreUser,
	deleteUser,
};
