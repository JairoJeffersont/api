const express = require('express');
const router = express.Router();
const PessoaController = require('../controllers/pessoa.controller');
const uploadImageMiddleware = require('../middleware/uploadImageMiddleware');



router.get('/pessoas-sync', PessoaController.syncModel);

router.post('/pessoas', uploadImageMiddleware, PessoaController.create);

router.put('/pessoas/:id', uploadImageMiddleware, PessoaController.update);

router.get('/pessoas', PessoaController.list);

router.get('/pessoas/:id', PessoaController.find);

router.get('/pessoaBusca', PessoaController.search);

router.delete('/pessoas/:id', PessoaController.delete);
module.exports = router;