const { Schema, model } = require('mongoose');

const UserModel = Schema({
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
	password: {
		type: String,
		required: true,
	},
	img: {
		type: String,
	},
	role: {
		type: String,
		required: true,
		default: 'USER_ROLE',
	},
	google: {
		type: Boolean,
		default: false,
	},
	estado: {
		type: Boolean,
		default: true,
	},
});

UserModel.method('toJSON', function () {
	const { __v, _id, password, ...object } = this.toObject();
	object.id = _id;
	return object;
});

module.exports = model('Usuario', UserModel);
