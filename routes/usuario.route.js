const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuario.controller');

router.get('/usuarios', UsuarioController.list);

router.get('/usuarios/:id', UsuarioController.find);

router.delete('/usuarios/:id', UsuarioController.delete);

router.post('/usuarios', UsuarioController.create);

router.put('/usuarios/:id', UsuarioController.update);

router.get('/usuarios-sync', UsuarioController.syncModel);

module.exports = router;
