const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const { imageUpdate } = require('../helpers/update-image');

// =================================================================
// FILE UPLOAD
// ==================================================================
const fileUpload = (req, res = response) => {
	const tipo = req.params.tipo;
	const id = req.params.id;

	// validar tipo
	const tipoValidos = ['hospitals', 'doctors', 'usuarios'];
	if (!tipoValidos.includes(tipo)) {
		return res.status(400).json({
			ok: false,
			msg: 'No es un doctors, usuarios u hospitals.',
		});
	}

	// validar que exista el archivo
	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).json({
			ok: false,
			msg: 'No hay ningún archivo.',
		});
	}

	// procesar imagen
	const file = req.files.imagen;

	const nombreCortado = file.name.split('.'); //wolwerine.1.3.jpg
	const extensionArchivo = nombreCortado[nombreCortado.length - 1];

	// validar extension
	const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
	if (!extensionesValidas.includes(extensionArchivo)) {
		return res.status(400).json({
			ok: false,
			msg: 'No es una extensión permitida.',
		});
	}

	// generar el nombre del archivo
	const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

	//PATH para guardar la imagen
	const path = `./uploads/${tipo}/${nombreArchivo}`;

	// mover imagen
	file.mv(path, (err) => {
		if (err) {
			console.log(err);
			return res.status(500).json({
				ok: false,
				msg: 'Error al mover la imagen.',
			});
		}
		// actualizar base de datos
		imageUpdate(tipo, id, nombreArchivo);

		res.status(200).json({
			ok: true,
			msg: 'Archivo súbido.',
			nombreArchivo,
		});
	});
};

const getImagen = (req, res) => {
	const tipo = req.params.tipo;
	const foto = req.params.foto;

	const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

	// imagen por defecto
	if (fs.existsSync(pathImg)) {
		res.sendFile(pathImg);
	} else {
		const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
		res.sendFile(pathImg);
	}
};

module.exports = {
	fileUpload,
	getImagen,
};
