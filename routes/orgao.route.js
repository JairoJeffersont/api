const express = require('express');
const router = express.Router();
const OrgaoController = require('../controllers/orgao.controller');



router.get('/orgaos-sync', OrgaoController.syncModel);

/**
 * @swagger
 * /api/orgaos:
 *   get:
 *     summary: Lista os órgãos com paginação e ordenação
 *     tags:
 *       - Órgãos
 *     parameters:
 *       - name: pagina
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *           example: 1
 *       - name: itens
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *           example: 10
 *       - name: ordem
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           default: ASC
 *           example: ASC
 *       - name: ordernarPor
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           default: orgao_nome
 *           example: orgao_nome
 *     responses:
 *       200:
 *         description: Lista de órgãos com sucesso.
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
 *                   example: 25 órgão(s) encontrado(s)
 *                 dados:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       orgao_id:
 *                         type: integer
 *                         example: 1
 *                       orgao_nome:
 *                         type: string
 *                         example: Saúde
 *                       orgao_tipo:
 *                         type: object
 *                         properties:
 *                           orgao_tipo_id:
 *                             type: integer
 *                             example: 2
 *                           orgao_tipo_nome:
 *                             type: string
 *                             example: Hospital
 *                       usuario:
 *                         type: object
 *                         properties:
 *                           usuario_id:
 *                             type: integer
 *                             example: 1
 *                           usuario_nome:
 *                             type: string
 *                             example: João Silva
 *                 links:
 *                   type: object
 *                   properties:
 *                     first:
 *                       type: string
 *                       example: /api/orgaos?itens=10&pagina=1&ordem=ASC&ordernarPor=orgao_nome
 *                     self:
 *                       type: string
 *                       example: /api/orgaos?itens=10&pagina=1&ordem=ASC&ordernarPor=orgao_nome
 *                     last:
 *                       type: string
 *                       example: /api/orgaos?itens=10&pagina=5&ordem=ASC&ordernarPor=orgao_nome
 *       204:
 *         description: Nenhum órgão registrado.
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
 *                   example: Nenhum órgão registrado.
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
router.get('/orgaos', OrgaoController.list);

/**
 * @swagger
 * /api/orgaos:
 *   post:
 *     summary: Cria um novo órgão.
 *     description: Cria um novo órgão. <p>Campos obrigatórios <br><br><b>orgao_nome</b><br> <b>orgao_email</b><br> <b>orgao_municipio</b><br> <b>orgao_estado</b><br> <b>orgao_tipo</b></p><p></p><p>Os tipos de órgãos podem ser encontrados em <br><br><code>/api/tipos-orgaos</b></code>
 *     tags:
 *       - Órgãos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orgao_nome:
 *                 type: string
 *                 description: Nome do órgão (obrigatório)
 *                 example: Saúde
 *               orgao_email:
 *                 type: string
 *                 description: E-mail de contato do órgão (obrigatório)
 *                 example: contato@saude.com
 *               orgao_telefone:
 *                 type: string
 *                 description: Telefone do órgão (opcional)
 *                 example: 11987654321
 *               orgao_cep:
 *                 type: string
 *                 description: CEP do órgão (opcional)
 *                 example: 01000-000
 *               orgao_endereco:
 *                 type: string
 *                 description: Endereço do órgão (opcional)
 *                 example: Rua da Saúde, 123
 *               orgao_bairro:
 *                 type: string
 *                 description: Bairro do órgão (opcional)
 *                 example: Centro
 *               orgao_municipio:
 *                 type: string
 *                 description: Município onde o órgão está localizado (obrigatório)
 *                 example: São Paulo
 *               orgao_estado:
 *                 type: string
 *                 description: Estado onde o órgão está localizado (obrigatório)
 *                 example: SP
 *               orgao_site:
 *                 type: string
 *                 description: Site do órgão (opcional)
 *                 example: http://saude.com
 *               orgao_instagram:
 *                 type: string
 *                 description: Instagram do órgão (opcional)
 *                 example: saude
 *               orgao_facebook:
 *                 type: string
 *                 description: Facebook do órgão (opcional)
 *                 example: facebook.com/saude
 *               orgao_informacoes:
 *                 type: string
 *                 description: Informações adicionais sobre o órgão (opcional)
 *                 example: Informações adicionais sobre o órgão
 *               orgao_tipo:
 *                 type: integer
 *                 description: Tipo do órgão (obrigatório)
 *                 example: 1
 *     responses:
 *       201:
 *         description: Órgão criado com sucesso.
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
 *                   example: Órgão criado com sucesso.
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
 *                   example: Todos os campos obrigatórios devem ser preenchidos
 *       409:
 *         description: Conflito devido a dados já existentes ou incorretos.
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
 *                   example: Esse órgão já está cadastrado
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
 *                   example: Erro interno do servidor
 */
router.post('/orgaos', OrgaoController.create);

/**
 * @swagger
 * /api/orgaos/{id}:
 *   put:
 *     summary: Atualiza um órgão existente.
 *     tags:
 *       - Órgãos
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do órgão a ser atualizado
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orgao_nome:
 *                 type: string
 *                 description: Nome do órgão (obrigatório)
 *                 example: Saúde
 *               orgao_email:
 *                 type: string
 *                 description: E-mail de contato do órgão (obrigatório)
 *                 example: contato@saude.com
 *               orgao_telefone:
 *                 type: string
 *                 description: Telefone do órgão (opcional)
 *                 example: 11987654321
 *               orgao_cep:
 *                 type: string
 *                 description: CEP do órgão (opcional)
 *                 example: 01000-000
 *               orgao_endereco:
 *                 type: string
 *                 description: Endereço do órgão (opcional)
 *                 example: Rua da Saúde, 123
 *               orgao_bairro:
 *                 type: string
 *                 description: Bairro do órgão (opcional)
 *                 example: Centro
 *               orgao_municipio:
 *                 type: string
 *                 description: Município onde o órgão está localizado (obrigatório)
 *                 example: São Paulo
 *               orgao_estado:
 *                 type: string
 *                 description: Estado onde o órgão está localizado (obrigatório)
 *                 example: SP
 *               orgao_site:
 *                 type: string
 *                 description: Site do órgão (opcional)
 *                 example: http://saude.com
 *               orgao_instagram:
 *                 type: string
 *                 description: Instagram do órgão (opcional)
 *                 example: saude
 *               orgao_facebook:
 *                 type: string
 *                 description: Facebook do órgão (opcional)
 *                 example: facebook.com/saude
 *               orgao_informacoes:
 *                 type: string
 *                 description: Informações adicionais sobre o órgão (opcional)
 *                 example: Informações adicionais sobre o órgão
 *               orgao_tipo:
 *                 type: integer
 *                 description: Tipo do órgão (obrigatório)
 *                 example: 2
 *     responses:
 *       200:
 *         description: Órgão atualizado com sucesso.
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
 *                   example: Órgão atualizado com sucesso.
 *       400:
 *         description: Solicitação inválida (campo obrigatório ausente ou inválido).
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
 *                   example: Todos os campos obrigatórios devem ser preenchidos ou dados inválidos.
 *       404:
 *         description: Órgão não encontrado ou nenhum dado atualizado.
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
 *                   example: Órgão não encontrado ou nenhum dado atualizado.
 *       409:
 *         description: Conflito devido a dados incorretos.
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
 *                   example: O tipo de órgão ou ID do usuário está incorreto.
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
router.put('/orgaos/:id', OrgaoController.update);

/**
 * @swagger
 * /api/orgaos/{id}:
 *   get:
 *     summary: Retorna um órgão pelo ID
 *     tags:
 *       - Órgãos
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Órgão encontrado com sucesso.
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
 *                   example: Órgão encontrado
 *                 dados:
 *                   type: object
 *                   properties:
 *                     orgao_id:
 *                       type: integer
 *                       example: 1
 *                     orgao_nome:
 *                       type: string
 *                       example: Saúde
 *                     orgao_tipo:
 *                       type: object
 *                       properties:
 *                         orgao_tipo_id:
 *                           type: integer
 *                           example: 2
 *                         orgao_tipo_nome:
 *                           type: string
 *                           example: Hospital
 *                     usuario:
 *                       type: object
 *                       properties:
 *                         usuario_id:
 *                           type: integer
 *                           example: 1
 *                         usuario_nome:
 *                           type: string
 *                           example: João Silva
 *       404:
 *         description: Órgão não encontrado.
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
 *                   example: Órgão não encontrado
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
 *                   example: Erro interno do servidor
 */
router.get('/orgaos/:id', OrgaoController.find);

/**
 * @swagger
 * /api/orgaosBusca:
 *   get:
 *     summary: Busca órgãos pelo nome
 *     tags:
 *       - Órgãos
 *     parameters:
 *       - name: nome
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           example: Saúde
 *     responses:
 *       200:
 *         description: Órgãos encontrados com sucesso.
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
 *                   example: 3 órgão(s) encontrado(s)
 *                 dados:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       orgao_id:
 *                         type: integer
 *                         example: 1
 *                       orgao_nome:
 *                         type: string
 *                         example: Saúde
 *                       orgao_tipo:
 *                         type: object
 *                         properties:
 *                           orgao_tipo_id:
 *                             type: integer
 *                             example: 2
 *                           orgao_tipo_nome:
 *                             type: string
 *                             example: Hospital
 *                       usuario:
 *                         type: object
 *                         properties:
 *                           usuario_id:
 *                             type: integer
 *                             example: 1
 *                           usuario_nome:
 *                             type: string
 *                             example: João Silva
 *       204:
 *         description: Nenhum órgão encontrado.
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
 *                   example: Nenhum órgão encontrado
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
 *                   example: Erro interno do servidor
 */
router.get('/orgaosBusca', OrgaoController.search);

/**
 * @swagger
 * /api/orgaos/{id}:
 *   delete:
 *     summary: Deleta um órgão pelo ID
 *     tags:
 *       - Órgãos
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Órgão apagado com sucesso.
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
 *                   example: Órgão apagado com sucesso
 *       404:
 *         description: Órgão não encontrado.
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
 *                   example: Órgão não encontrado
 *       409:
 *         description: Não é possível apagar o órgão porque ele está referenciado em outras tabelas.
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
 *                   example: Não é possível apagar o órgão porque ele está referenciado em outras tabelas.
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
 *                   example: Erro interno do servidor
 */
router.delete('/orgaos/:id', OrgaoController.delete);

module.exports = router;