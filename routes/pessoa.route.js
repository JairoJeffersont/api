const express = require('express');
const router = express.Router();
const PessoaController = require('../controllers/pessoa.controller');

router.get('/pessoas-sync', PessoaController.syncModel);
router.post('/pessoas', PessoaController.create);
router.put('/pessoas/:id', PessoaController.update);
router.get('/pessoas', PessoaController.list);
router.get('/pessoas/:id', PessoaController.find);
router.delete('/pessoas/:id', PessoaController.delete);
module.exports = router;