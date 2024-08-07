const express = require('express');
const router = express.Router();
const OrgaoController = require('../controllers/orgao.controller');

router.get('/orgaos-sync', OrgaoController.syncModel);
router.get('/orgaos', OrgaoController.list);
router.post('/orgaos', OrgaoController.create);
router.put('/orgaos/:id', OrgaoController.update);
router.get('/orgaos/:id', OrgaoController.find);
router.get('/orgaosBusca', OrgaoController.search);
router.delete('/orgaos/:id', OrgaoController.delete);

module.exports = router;