const { Schema, model } = require('mongoose');

const HospitalModel = Schema(
	{
		nombre: {
			type: String,
			required: true,
		},
		direccion: {
			type: String,
			required: true,
		},
		telefono: {
			type: String,
			required: true,
		},
		img: {
			type: String,
		},
		estado: {
			type: Boolean,
			default: true,
		},
		usuario: {
			required: true,
			type: Schema.Types.ObjectId,
			ref: 'Usuario',
		},
	},
	{ colletion: 'hospitals' }
);

HospitalModel.method('toJSON', function () {
	const { __v, ...object } = this.toObject();
	return object;
});

module.exports = model('Hospital', HospitalModel);
