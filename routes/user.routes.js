/*
    Ruta: /api/usuarios
*/

const { Router } = require('express');

const router = Router();

const { UserController } = require('../controllers/index');
const { validarCampos } = require('../middlewares/index');
const {
	validationUserModel,
	validationUpdateUser,
} = require('../middlewares/validationModels');
const { validarJWT } = require('../middlewares/validar-jwt');

router.get('/', validarJWT, UserController.getUsers);
router.get('/deleted', validarJWT, UserController.getUsersDeleted);
router.post(
	'/',
	[validarJWT, validationUserModel, validarCampos],
	UserController.createUser
);
router.put(
	'/:id',
	[validarJWT, validationUpdateUser, validarCampos],
	UserController.updateUser
);
router.put('/restore/:id', validarJWT, UserController.restoreUser);
router.delete('/:id', validarJWT, UserController.deleteUser);

module.exports = router;
