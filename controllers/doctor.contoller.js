const { response } = require('express');
const { DoctorModel } = require('../models/index');

// =================================================================
// GET - doctor
// ==================================================================
const getDoctors = async (req, res = response) => {
	const doctors = await DoctorModel.find()
		.populate('usuario', 'nombre img')
		.populate('hospital', 'nombre');

	try {
		res.status(200).json({
			ok: true,
			doctors,
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
// CREATE - doctor
// ==================================================================
const createDoctor = async (req, res = response) => {
	const uid = req.uid;

	// verificando si usuario existe
	const exitsEmail = await DoctorModel.findOne({ email: req.body.email });

	if (exitsEmail) {
		return res.status(400).json({
			ok: false,
			smg: 'El correo ya está registrado',
		});
	}

	// create a new Doctor
	const doctor = new DoctorModel({
		usuario: uid,
		...req.body,
	});

	try {
		// save new Doctor
		const doctorDB = await doctor.save();
		res.status(200).json({
			ok: true,
			doctor: doctorDB,
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
// UPDATE - doctor
// ==================================================================
const updateDoctor = (req, res = response) => {
	res.status(200).json({
		ok: true,
		msg: 'update Doctores',
	});
};

// =================================================================
// DELETE - doctor
// ==================================================================
const deleteDoctor = (req, res = response) => {
	res.status(200).json({
		ok: true,
		msg: 'Delete Doctores',
	});
};

module.exports = {
	getDoctors,
	createDoctor,
	updateDoctor,
	deleteDoctor,
};
