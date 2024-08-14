const express = require('express');
const router = express.Router();
const TipoPessoaController = require('../controllers/tipo_pessoa.controller');

/**
 * @swagger
 * /api/tipo-pessoas:
 *   get:
 *     summary: Lista os tipos de pessoa com ordenação. Não há campos obrigatórios.
 *     tags:
 *       - Tipos de Pessoas
 *     responses:
 *       200:
 *         description: Lista de tipos de pessoa encontrada com sucesso.
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
 *                   example: 5 tipo(s) de pessoa(s) encontrado(s)
 *                 dados:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       tipo_pessoa_id:
 *                         type: integer
 *                         example: 1
 *                       tipo_pessoa_nome:
 *                         type: string
 *                         example: Administrador
 *                       tipo_pessoa_descricao:
 *                         type: string
 *                         example: Responsável por gerenciar usuários e permissões
 *       204:
 *         description: Nenhum tipo de pessoa registrado.
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
 *                   example: Nenhum tipo de pessoa registrado.
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
router.get('/tipos-pessoas', TipoPessoaController.list);

/**
 * @swagger
 * /api/tipo-pessoas:
 *   post:
 *     summary: Cria um novo tipo de pessoa. 
 *     description: Campos obrigatórios <br><br><b>tipo_pessoa_nome<b></br> <b>tipo_pessoa_descricao</b>.
 *     tags:
 *       - Tipos de Pessoas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo_pessoa_nome:
 *                 type: string
 *                 description: Nome do tipo de pessoa (obrigatório)
 *                 example: Administrador
 *               tipo_pessoa_descricao:
 *                 type: string
 *                 description: Descrição do tipo de pessoa (obrigatório)
 *                 example: Responsável por gerenciar usuários e permissões
 *     responses:
 *       201:
 *         description: Tipo de pessoa criado com sucesso.
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
 *                   example: Tipo de Pessoa criado com sucesso.
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
 *                   example: Esse tipo de pessoa já está cadastrado.
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
router.post('/tipos-pessoas/', TipoPessoaController.create);

/**
 * @swagger
 * /api/tipo-pessoas/{id}:
 *   delete:
 *     summary: Remove um tipo de pessoa. O parâmetro `id` é obrigatório.
 *     tags:
 *       - Tipos de Pessoas
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do tipo de pessoa a ser excluído
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Tipo de pessoa removido com sucesso.
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
 *                   example: Tipo de pessoa apagado com sucesso.
 *       404:
 *         description: Tipo de pessoa não encontrado.
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
 *                   example: Tipo de pessoa não encontrado.
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
 *                   example: Não é possível apagar esse tipo de pessoa porque ele está referenciado em outras tabelas.
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
router.delete('/tipos-pessoas/:id', TipoPessoaController.delete);


router.get('/tipos-pessoas-sync', TipoPessoaController.syncModel);
module.exports = router;
