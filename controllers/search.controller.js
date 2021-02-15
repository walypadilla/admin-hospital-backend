const { UserModel, DoctorModel, HospitalModel } = require('../models/index');

// =======================================================================
// GetTodo
// =======================================================================
const getTodo = async (req, res) => {
	const busqueda = req.params.busqueda;
	try {
		const regex = RegExp(busqueda, 'i');

		// resoloviendo las promesas al mismo tiempo
		const [usuario, doctor, hospital] = await Promise.all([
			UserModel.find({ nombre: regex }),
			DoctorModel.find({ nombre: regex }),
			HospitalModel.find({ nombre: regex }),
		]);

		res.status(200).json({
			ok: true,
			usuario,
			doctor,
			hospital,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Hable con el administrador',
		});
	}
};

// =======================================================================
// Get for Collection Documents
// =======================================================================
const getCollectionDocuments = async (req, res) => {
	const tabla = req.params.tabla;
	const busqueda = req.params.busqueda;
	const regex = RegExp(busqueda, 'i');

	try {
		let data = [];
		switch (tabla) {
			case 'doctors':
				data = await DoctorModel.find({ nombre: regex })
					.populate('usuario', 'nombre img')
					.populate('hospital', 'nombre');
				break;
			case 'hospitals':
				data = await HospitalModel.find({ nombre: regex }).populate(
					'usuario',
					'nombre img'
				);
				break;
			case 'usuarios':
				data = await UserModel.find({ nombre: regex });

				break;

			default:
				return res.status(400).json({
					ok: false,
					msg: 'La tabla tiene que ser usuarios/hospitals/doctors',
				});
		}
		res.status(200).json({
			ok: true,
			resultados: data,
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
	getTodo,
	getCollectionDocuments,
};
