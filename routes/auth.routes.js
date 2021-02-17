/*
    Ruta: /api/login
*/

const express = require('express');
const routes = express.Router();

const { AuthController } = require('../controllers/index');
const {
	validationLogin,
	validationLoginGoogle,
} = require('../middlewares/validationModels');
const { validarCampos } = require('../middlewares/index');

routes.post('/', [validationLogin, validarCampos], AuthController.login);
routes.post(
	'/google',
	[validationLoginGoogle, validarCampos],
	AuthController.googleSingIn
);

module.exports = routes;
