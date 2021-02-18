const { response } = require('express');

const { HospitalModel } = require('../models/index');

// =================================================================
// GET - HOSPITALS
// ==================================================================
const getHospitals = async (req, res = response) => {
	const hospitals = await HospitalModel.find({ estado: true }).populate(
		'usuario',
		'nombre img'
	);
	// if not errors
	try {
		res.status(200).json({
			ok: true,
			hospitals,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Hable con el administrador',
		});
	}
};

// ==================================================================
// CREATE - HOSPITALS
// ==================================================================
const createHospital = async (req, res = response) => {
	const uid = req.uid;
	// create new hospital
	const hospital = new HospitalModel({
		usuario: uid,
		...req.body,
	});

	// verify not error
	try {
		// save new hospital
		const hospitalDB = await hospital.save();
		res.status(200).json({
			ok: true,
			hospital: hospitalDB,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Hable con el administrador',
		});
	}
};

// =================================================================
// UPDATE - HOSPITALS
// ==================================================================
const updateHospital = async (req, res = response) => {
	const id = req.params.id;
	const uid = req.uid;

	try {
		const hospitalDB = await HospitalModel.findById(id);
		if (!hospitalDB) {
			res.status(404).json({
				ok: false,
				msg: 'Hospital no encontrado.',
			});
		}

		// extrayendo todo lo que viene en el body y el usuario
		const changeHospital = {
			...req.body,
			usuario: uid,
		};

		// almacenando en la base de datos
		const updatedHospital = await HospitalModel.findByIdAndUpdate(
			id,
			changeHospital,
			{ new: true }
		);

		res.status(200).json({
			ok: true,
			msg: 'update Hospitales',
			hospitalDB: updatedHospital,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Hable con el administrador',
		});
	}
};

// =================================================================
// DELETE - HOSPITALS
// ==================================================================
const deleteHospital = async (req, res = response) => {
	const id = req.params.id;

	try {
		const hospitalDB = await HospitalModel.findById(id);
		if (!hospitalDB) {
			res.status(404).json({
				ok: false,
				msg: 'Hospital no encontrado.',
			});
		}

		hospitalDB.estado = false;
		// almacenando en la base de datos
		const updatedHospital = await HospitalModel.findByIdAndUpdate(
			id,
			hospitalDB,
			{ new: true }
		);

		res.status(200).json({
			ok: true,
			msg: 'Hospital eliminado correctamente.',
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
	getHospitals,
	createHospital,
	updateHospital,
	deleteHospital,
};
