const express = require('express');
const router = express.Router();
const TipoOrgaoController = require('../controllers/tipo_orgao.controller');

router.get('/tipos-orgaos', TipoOrgaoController.list);

/**
 * @swagger
 * /api/tipos-orgaos:
 *   post:
 *     summary: Cria um novo tipo de órgão.
 *     description: Campos obrigatórios<br><br> <b>orgao_tipo_nome</b><br> <b>orgao_tipo_descricao</b>
 *     tags:
 *       - Tipos de Órgãos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orgao_tipo_nome:
 *                 type: string
 *                 description: Nome do tipo de órgão (obrigatório)
 *                 example: Saúde
 *               orgao_tipo_descricao:
 *                 type: string
 *                 description: Descrição do tipo de órgão (obrigatório)
 *                 example: Tipos relacionados à saúde e bem-estar
 *     responses:
 *       201:
 *         description: Tipo de órgão criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: Tipo de órgão criado com sucesso.
 *       400:
 *         description: Todos os campos obrigatórios devem ser preenchidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Todos os campos obrigatórios devem ser preenchidos.
 *       409:
 *         description: Conflito devido a dados já existentes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 409
 *                 message:
 *                   type: string
 *                   example: Esse tipo de órgão já está cadastrado.
 *       500:
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Erro interno do servidor.
 */
router.post('/tipos-orgaos/', TipoOrgaoController.create);

/**
 * @swagger
 * /api/tiposorgaos/{id}:
 *   delete:
 *     summary: Remove um tipo de órgão. O parâmetro `id` é obrigatório.
 *     tags:
 *       - Tipos de Órgãos
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do tipo de órgão a ser excluído
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Tipo de órgão removido com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Tipo de órgão removido com sucesso.
 *       404:
 *         description: Tipo de órgão não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: Tipo de órgão não encontrado.
 *       409:
 *         description: Conflito devido a referências em outras tabelas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 409
 *                 message:
 *                   type: string
 *                   example: Não é possível apagar esse tipo de órgão porque ele está referenciado em outras tabelas.
 *       500:
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Erro interno do servidor.
 */
router.delete('/tipos-orgaos/:id', TipoOrgaoController.delete);

/**
 * @swagger
 * /api/tipos-orgaos:
 *   get:
 *     summary: Lista os tipos de órgãos com ordenação.
 *     tags:
 *       - Tipos de Órgãos
 *     responses:
 *       200:
 *         description: Lista de tipos de órgãos encontrada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: 3 tipo(s) de órgão(s) encontrado(s)
 *                 dados:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       orgao_tipo_id:
 *                         type: integer
 *                         example: 1
 *                       orgao_tipo_nome:
 *                         type: string
 *                         example: Saúde
 *                       orgao_tipo_descricao:
 *                         type: string
 *                         example: Tipos relacionados à saúde e bem-estar
 *       204:
 *         description: Nenhum tipo de órgão registrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 204
 *                 message:
 *                   type: string
 *                   example: Nenhum tipo de órgão registrado.
 *       500:
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Erro interno do servidor.
 */
router.get('/tipos-orgaos-sync', TipoOrgaoController.syncModel);
module.exports = router;
