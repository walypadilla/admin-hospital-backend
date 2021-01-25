/*
    Ruta: /api/login
*/

const express = require('express');
const routes = express.Router();

const { AuthController } = require('../controllers/index');
const { validationLogin } = require('../middlewares/validationModels');
const { validarCampos } = require('../middlewares/index');

routes.post('/', [validationLogin, validarCampos], AuthController.login);

module.exports = routes;
