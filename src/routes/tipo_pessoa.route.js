const express = require('express');
const router = express.Router();
const TipoPessoaController = require('../controllers/tipo_pessoa.controller');

router.get('/tipos-pessoas', TipoPessoaController.list);

router.post('/tipos-pessoas/', TipoPessoaController.create);

router.delete('/tipos-pessoas/:id', TipoPessoaController.delete);

router.get('/tipos-pessoas-sync', TipoPessoaController.syncModel);

module.exports = router;
