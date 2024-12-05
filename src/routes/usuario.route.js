const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuario.controller');
const uploadImageMiddleware = require('../middleware/uploadImageMiddleware');


router.get('/usuarios', UsuarioController.list);

router.get('/usuarios/:id', UsuarioController.find);

router.delete('/usuarios/:id', UsuarioController.delete);

router.post('/usuarios', uploadImageMiddleware, UsuarioController.create);

router.put('/usuarios/:id', uploadImageMiddleware, UsuarioController.update);

router.get('/usuarios-sync', UsuarioController.syncModel);

module.exports = router;
