const fs = require('fs');

const { DoctorModel, HospitalModel, UserModel } = require('../models/index');

// =================================================================
//  IMAGE DELETE FOR MODEL
// ==================================================================
const imageDelete = (path) => {
	if (fs.existsSync(path)) {
		// delete the previous image
		fs.unlinkSync(path);
	}
};

// =================================================================
//  UPDATE IMAGE
// ==================================================================
const imageUpdate = async (tipo, id, nombreArchivo) => {
	let pathOld = '';
	switch (tipo) {
		case 'doctors':
			const doctor = await DoctorModel.findById(id);

			// verificando si existe el medico
			if (!doctor) {
				console.log('No es un médico por id.');
				return false;
			}
			// checking if the model has a picture
			pathOld = `./uploads/doctors/${doctor.img}`;
			imageDelete(pathOld);

			doctor.img = nombreArchivo;
			await doctor.save();
			return true;

			break;
		case 'hospitals':
			const hospital = await HospitalModel.findById(id);

			// verificando si existe el medico
			if (!hospital) {
				console.log('No es un Hospital por id.');
				return false;
			}
			// checking if the model has a picture
			pathOld = `./uploads/hospitals/${hospital.img}`;
			imageDelete(pathOld);

			hospital.img = nombreArchivo;
			await hospital.save();
			return true;

			break;
		case 'usuarios':
			const usuario = await UserModel.findById(id);

			// verificando si existe el medico
			if (!usuario) {
				console.log('No es un usuario por id');
				return false;
			}
			// checking if the model has a picture
			pathOld = `./uploads/usuarios/${usuario.img}`;
			imageDelete(pathOld);

			usuario.img = nombreArchivo;
			await usuario.save();
			return true;
			break;
		default:
			console.log('No es una categoria válida');
			break;
	}
};

module.exports = {
	imageUpdate,
};
