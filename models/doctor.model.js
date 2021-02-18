const { Schema, model } = require('mongoose');

const DoctorModel = Schema(
	{
		nombre: {
			type: String,
			required: true,
		},
		apellido: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		img: {
			type: String,
		},
		estado: {
			type: Boolean,
			default: true,
		},
		usuario: {
			type: Schema.Types.ObjectId,
			ref: 'Usuario',
			required: true,
		},
		hospital: {
			type: Schema.Types.ObjectId,
			ref: 'Hospital',
			required: true,
		},
	},
	{ colletion: 'doctors' }
);

DoctorModel.method('toJSON', function () {
	const { __v, ...object } = this.toObject();
	return object;
});

module.exports = model('Doctor', DoctorModel);
