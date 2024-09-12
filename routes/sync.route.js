const express = require('express');
const router = express.Router();
const addLog = require('../middleware/logger');


const TipoPessoaController = require('../controllers/tipo_pessoa.controller');
const TipoOrgaoController = require('../controllers/tipo_orgao.controller');
const OrgaoController = require('../controllers/orgao.controller');
const PessoaController = require('../controllers/pessoa.controller');
const UsuarioController = require('../controllers/usuario.controller');

router.get('/sync', async (req, res) => {
    try {
        const results = [];

        results.push(await UsuarioController.syncModel());
        results.push(await TipoOrgaoController.syncModel());
        results.push(await TipoPessoaController.syncModel());
        results.push(await OrgaoController.syncModel());
        results.push(await PessoaController.syncModel());

        res.status(200).json({
            status: 200,
            message: 'Tabelas sincronizadas com sucesso'
        });

    } catch (error) {
        addLog('error_sync', error.message);
        res.status(500).json({ status: 500, message: 'Erro ao sincronizar os modelos' });
    }
});

module.exports = router;
