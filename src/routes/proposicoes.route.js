const express = require('express');
const router = express.Router();
const ProposicaoController = require('../controllers/proposicoes.controller');


router.get('/proposicoes', ProposicaoController.ProposicoesDeputado);

router.get('/proposicao-principal', ProposicaoController.BuscarPrincipal);

router.get('/proposicao-apensados', ProposicaoController.BuscarApensadosDoGabinete);

router.get('/proposicao-autores', ProposicaoController.BuscarAutores);

router.get('/medidas-provisorias', ProposicaoController.BuscarMP);





module.exports = router;