const express = require('express');
const router = express.Router();
const TipoOrgaoController = require('../controllers/tipo_orgao.controller');

router.get('/tipos-orgaos', TipoOrgaoController.list);

router.post('/tipos-orgaos/', TipoOrgaoController.create);

router.delete('/tipos-orgaos/:id', TipoOrgaoController.delete);

router.get('/tipos-orgaos-sync', TipoOrgaoController.syncModel);

module.exports = router;
