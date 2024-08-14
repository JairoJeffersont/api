const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuario.controller');

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Lista os usuários com paginação e ordenação
 *     tags:
 *       - Usuários
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
 *           default: usuario_nome
 *           example: usuario_nome
 *     responses:
 *       200:
 *         description: Lista de usuários com sucesso.
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
 *                   example: 25 usuário(s) encontrado(s)
 *                 dados:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       usuario_id:
 *                         type: integer
 *                         example: 1
 *                       usuario_nome:
 *                         type: string
 *                         example: João Silva
 *                       usuario_email:
 *                         type: string
 *                         example: joao.silva@example.com
 *                       usuario_aniversario:
 *                         type: string
 *                         format: date
 *                         example: 1980-01-01
 *                       usuario_telefone:
 *                         type: string
 *                         example: 11987654321
 *                       usuario_nivel:
 *                         type: integer
 *                         example: 2
 *                       usuario_ativo:
 *                         type: boolean
 *                         example: false
 *                 links:
 *                   type: object
 *                   properties:
 *                     first:
 *                       type: string
 *                       example: /api/usuarios?itens=10&pagina=1&ordem=ASC&ordernarPor=usuario_nome
 *                     self:
 *                       type: string
 *                       example: /api/usuarios?itens=10&pagina=1&ordem=ASC&ordernarPor=usuario_nome
 *                     last:
 *                       type: string
 *                       example: /api/usuarios?itens=10&pagina=5&ordem=ASC&ordernarPor=usuario_nome
 *       400:
 *         description: Parâmetro 'ordenarPor' inválido.
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
 *                   example: Parâmetro 'ordenarPor' inválido.
 *       204:
 *         description: Nenhum usuário registrado.
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
 *                   example: Nenhum usuário registrado.
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
router.get('/usuarios', UsuarioController.list);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtém os dados de um usuário
 *     tags:
 *       - Usuários
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso.
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
 *                   example: Usuário encontrado
 *                 dados:
 *                   type: object
 *                   properties:
 *                     usuario_id:
 *                       type: integer
 *                       example: 1
 *                     usuario_nome:
 *                       type: string
 *                       example: João Silva
 *                     usuario_email:
 *                       type: string
 *                       example: joao.silva@example.com
 *                     usuario_aniversario:
 *                       type: string
 *                       format: date
 *                       example: 1980-01-01
 *                     usuario_telefone:
 *                       type: string
 *                       example: 11987654321
 *                     usuario_nivel:
 *                       type: integer
 *                       example: 2
 *                     usuario_ativo:
 *                       type: boolean
 *                       example: false
 *       204:
 *         description: Usuário não encontrado.
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
 *                   example: Usuário não encontrado.
 *       400:
 *         description: ID do usuário não enviado ou inválido.
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
 *                   example: ID do usuário não enviado ou inválido.
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
router.get('/usuarios/:id', UsuarioController.find);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Remove um usuário
 *     tags:
 *       - Usuários
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Usuário apagado com sucesso.
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
 *                   example: Usuário apagado com sucesso.
 *       404:
 *         description: Usuário não encontrado.
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
 *                   example: Usuário não encontrado.
 *       400:
 *         description: ID do usuário não enviado ou inválido.
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
 *                   example: ID do usuário não enviado ou inválido.
 *       409:
 *         description: Não é possível apagar o usuário porque ele está referenciado em outras tabelas.
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
 *                   example: Não é possível apagar esse usuário porque ele está referenciado em outras tabelas.
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
router.delete('/usuarios/:id', UsuarioController.delete);

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Cria um novo usuário
 *     tags:
 *       - Usuários
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario_nome:
 *                 type: string
 *                 example: João Silva
 *               usuario_email:
 *                 type: string
 *                 example: joao.silva@example.com
 *               usuario_senha:
 *                 type: string
 *                 example: senha123
 *               usuario_aniversario:
 *                 type: string
 *                 format: date
 *                 example: 1980-01-01
 *               usuario_telefone:
 *                 type: string
 *                 example: 11987654321
 *               usuario_nivel:
 *                 type: integer
 *                 example: 1
 *               usuario_ativo:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
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
 *                   example: Usuário criado com sucesso.
 *       400:
 *         description: Todos os campos são obrigatórios.
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
 *                   example: Todos os campos são obrigatórios.
 *       409:
 *         description: Esse usuário já está cadastrado.
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
 *                   example: Esse usuário já está cadastrado.
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
router.post('/usuarios', UsuarioController.create);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Atualiza os dados de um usuário
 *     tags:
 *       - Usuários
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
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
 *               usuario_nome:
 *                 type: string
 *                 example: João Silva
 *               usuario_email:
 *                 type: string
 *                 example: joao.silva@example.com
 *               usuario_senha:
 *                 type: string
 *                 example: novaSenha123
 *               usuario_aniversario:
 *                 type: string
 *                 format: date
 *                 example: 1980-01-01
 *               usuario_telefone:
 *                 type: string
 *                 example: 11987654321
 *               usuario_nivel:
 *                 type: integer
 *                 example: 2
 *               usuario_ativo:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso.
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
 *                   example: Usuário atualizado com sucesso.
 *       400:
 *         description: ID do usuário não enviado ou inválido.
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
 *                   example: ID do usuário não enviado ou inválido.
 *       404:
 *         description: Usuário não encontrado ou nenhum dado atualizado.
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
 *                   example: Usuário não encontrado ou nenhum dado atualizado.
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
router.put('/usuarios/:id', UsuarioController.update);

router.get('/usuarios-sync', UsuarioController.syncModel);

module.exports = router;
