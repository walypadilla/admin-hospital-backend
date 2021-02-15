const { response } = require('express');

const { HospitalModel } = require('../models/index');

// =================================================================
// GET - HOSPITALS
// ==================================================================
const getHospitals = async (req, res = response) => {
	const hospitals = await HospitalModel.find().populate(
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

// =================================================================
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
const updateHospital = (req, res = response) => {
	res.status(200).json({
		ok: true,
		msg: 'update Hospitales',
	});
};

// =================================================================
// DELETE - HOSPITALS
// ==================================================================
const deleteHospital = (req, res = response) => {
	res.status(200).json({
		ok: true,
		msg: 'Delete Hospitales',
	});
};

module.exports = {
	getHospitals,
	createHospital,
	updateHospital,
	deleteHospital,
};
