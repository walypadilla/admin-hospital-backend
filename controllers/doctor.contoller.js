const { response } = require('express');
const { DoctorModel } = require('../models/index');

// =================================================================
// GET - doctor --DELETED
// ==================================================================
const getDoctorsDeleted = async (req, res = response) => {
	try {
		const [doctors, total] = await Promise.all([
			DoctorModel.find({ estado: false }).populate('hospital', 'nombre'),

			DoctorModel.countDocuments({ estado: false }),
		]);

		res.status(200).json({
			ok: true,
			doctors,
			total,
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
// GET - doctor
// ==================================================================
const getDoctors = async (req, res = response) => {
	try {
		const [doctors, total] = await Promise.all([
			DoctorModel.find({ estado: true })
				.populate('usuario', 'nombre img')
				.populate('hospital', 'nombre'),

			DoctorModel.countDocuments({ estado: true }),
		]);

		res.status(200).json({
			ok: true,
			doctors,
			total,
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
const updateDoctor = async (req, res = response) => {
	const id = req.params.id;
	const uid = req.uid;

	try {
		const doctorDB = await DoctorModel.findById(id);
		if (!doctorDB) {
			res.status(404).json({
				ok: false,
				msg: 'Doctor no encontrado.',
			});
		}

		// extrayendo todo lo que viene en el body y el usuario
		const changeHospital = {
			...req.body,
			usuario: uid,
		};

		// almacenando en la base de datos
		const updatedDoctor = await DoctorModel.findByIdAndUpdate(
			id,
			changeHospital,
			{ new: true }
		);

		res.status(200).json({
			ok: true,
			msg: 'update Doctor',
			doctorDB: updatedDoctor,
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
// RESTORE - doctor
// ==================================================================
const restoreDoctor = async (req, res = response) => {
	const id = req.params.id;

	try {
		const doctorDB = await DoctorModel.findById(id);
		if (!doctorDB) {
			res.status(404).json({
				ok: false,
				msg: 'Doctor no encontrado.',
			});
		}

		doctorDB.estado = true;
		// almacenando en la base de datos
		const updatedDoctor = await DoctorModel.findByIdAndUpdate(id, doctorDB, {
			new: true,
		});

		res.status(200).json({
			ok: true,
			msg: 'Doctor restaurado correctamente.',
			updatedDoctor,
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
// DELETE - doctor
// ==================================================================
const deleteDoctor = async (req, res = response) => {
	const id = req.params.id;

	try {
		const doctorDB = await DoctorModel.findById(id);
		if (!doctorDB) {
			res.status(404).json({
				ok: false,
				msg: 'Doctor no encontrado.',
			});
		}

		doctorDB.estado = false;
		// almacenando en la base de datos
		const updatedHospital = await DoctorModel.findByIdAndUpdate(id, doctorDB, {
			new: true,
		});

		res.status(200).json({
			ok: true,
			msg: 'Doctor eliminado correctamente.',
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
	getDoctorsDeleted,
	getDoctors,
	createDoctor,
	updateDoctor,
	restoreDoctor,
	deleteDoctor,
};
