const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuario.controller');

/**
 * @swagger
 * tags:
 *   name: Usuários 
 */

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     tags: [Usuários]
 *     description: "Rota para listar os usuários inseridos no sistema."
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: pagina
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página a ser retornada.
 *       - in: query
 *         name: itens
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Número de itens por página.
 *       - in: query
 *         name: ordem
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           default: ASC
 *         description: Ordem de listagem dos usuários.
 *       - in: query
 *         name: ordernarPor
 *         schema:
 *           type: string
 *           default: "usuario_nome"
 *         description: Campo pelo qual os usuários serão ordenados.
 *     responses:
 *       200:
 *         description: Listagem bem-sucedida dos usuários.
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
 *                   example: "X usuário(s) encontrado(os)"
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
 *                         example: "João da Silva"
 *                       usuario_email:
 *                         type: string
 *                         example: "joao@email"
 *                       usuario_telefone:
 *                         type: string
 *                         example: "556100000000"
 *                       usuario_aniversario:
 *                         type: string
 *                         example: "2000-01-01"
 *                       usuario_nivel:
 *                         type: integer
 *                         example: 1
 *                       usuario_ativo:
 *                         type: boolean
 *                         example: true
 *                       usuario_foto:
 *                         type: string
 *                         example: "blob"
 *                 links:
 *                   type: object
 *                   properties:
 *                     first:
 *                       type: string
 *                       example: "/api/usuarios?itens=10&pagina=1&ordem=ASC&ordernarPor=usuario_nome"
 *                     self:
 *                       type: string
 *                       example: "/api/usuarios?itens=10&pagina=1&ordem=ASC&ordernarPor=usuario_nome"
 *                     last:
 *                       type: string
 *                       example: "/api/usuarios?itens=10&pagina={lastPage}&ordem=ASC&ordernarPor=usuario_nome"
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
 *                   example: "Nenhum usuário registrado"
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
 *                   example: "Parâmetro 'ordenarPor' inválido"
 *       401:
 *         description: Não autorizado, token inválido ou não fornecido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: "Não autorizado, token inválido ou não fornecido"
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
 *                   example: "Erro interno do servidor"
 */
router.get('/usuarios', UsuarioController.list);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     tags: [Usuários]
 *     description: "Rota para obter um usuário específico pelo ID."
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser retornado.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário encontrado.
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
 *                   example: "Usuário encontrado"
 *                 dados:
 *                   type: object
 *                   properties:
 *                     usuario_id:
 *                       type: integer
 *                       example: 1
 *                     usuario_nome:
 *                       type: string
 *                       example: "João da Silva"
 *                     usuario_email:
 *                       type: string
 *                       example: "joao@email"
 *                     usuario_telefone:
 *                       type: string
 *                       example: "556100000000"
 *                     usuario_aniversario:
 *                       type: string
 *                       example: "2000-01-01"
 *                     usuario_nivel:
 *                       type: integer
 *                       example: 1
 *                     usuario_ativo:
 *                       type: boolean
 *                       example: true
 *                     usuario_foto:
 *                       type: string
 *                       example: "blob"
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
 *                   example: "Usuário não encontrado"
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
 *                   example: "ID do usuário não enviado ou inválido"
 *       401:
 *         description: Não autorizado, token inválido ou não fornecido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: "Não autorizado, token inválido ou não fornecido"
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
 *                   example: "Erro interno do servidor"
 */
router.get('/usuarios/:id', UsuarioController.find);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     tags: [Usuários]
 *     description: "Rota para apagar um usuário específico pelo ID."
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser apagado.
 *         schema:
 *           type: integer
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
 *                   example: "Usuário apagado com sucesso"
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
 *                   example: "Usuário não encontrado"
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
 *                   example: "ID do usuário não enviado ou inválido"
 *       401:
 *         description: Não autorizado, token inválido ou não fornecido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: "Não autorizado, token inválido ou não fornecido"
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
 *                   example: "Erro interno do servidor"
 */
router.delete('/usuarios/:id', UsuarioController.delete);

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     tags: [Usuários]
 *     description: "Rota para inserir novo usuário."
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuario_nome
 *               - usuario_email
 *               - usuario_telefone
 *               - usuario_senha
 *               - usuario_aniversario
 *             properties:
 *               usuario_nome:
 *                 type: string
 *                 example: "João da Silva"
 *               usuario_email:
 *                 type: string
 *                 example: "joao@email.com"
 *               usuario_telefone:
 *                 type: string
 *                 example: "556100000000"
 *               usuario_senha:
 *                 type: string
 *                 example: "senha"
 *               usuario_aniversario:
 *                 type: string
 *                 format: date
 *                 example: "2000-01-01"
 *               usuario_nivel:
 *                 type: integer
 *                 example: 1
 *               usuario_ativo:
 *                 type: boolean
 *                 example: true
 *               usuario_foto:
 *                 type: string
 *                 example: "blob"
 *     responses:
 *       200:
 *         description: Usuário inserido com sucesso.
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
 *                   example: "Usuário inserido com sucesso"
 *       400:
 *         description: Preencha todos os campos obrigatórios.
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
 *                   example: "Preencha todos os campos obrigatórios"
 *       401:
 *         description: Não autorizado, token inválido ou não fornecido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: "Não autorizado, token inválido ou não fornecido"
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
 *                   example: "Esse usuário já está cadastrado"
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
 *                   example: "Erro interno do servidor"
 */
router.post('/usuarios', UsuarioController.create);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     tags: [Usuários]
 *     description: "Rota para atualizar um usuário."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser atualizado.
 *         schema:
 *           type: integer
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario_nome:
 *                 type: string
 *                 example: "João da Silva"
 *               usuario_email:
 *                 type: string
 *                 example: "joao@email.com"
 *               usuario_telefone:
 *                 type: string
 *                 example: "556100000000"
 *               usuario_senha:
 *                 type: string
 *                 example: "senha"
 *               usuario_aniversario:
 *                 type: string
 *                 format: date
 *                 example: "2000-01-01"
 *               usuario_nivel:
 *                 type: integer
 *                 example: 1
 *               usuario_ativo:
 *                 type: boolean
 *                 example: true
 *               usuario_foto:
 *                 type: string
 *                 example: "blob"
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
 *                   example: "Usuário atualizado com sucesso"
 *       400:
 *         description: ID do usuário não enviado ou inválido ou campos obrigatórios não enviados.
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
 *                   example: "ID do usuário não enviado ou inválido ou campos obrigatórios não enviados"
 *       401:
 *         description: Não autorizado, token inválido ou não fornecido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: "Não autorizado, token inválido ou não fornecido"
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
 *                   example: "Erro interno do servidor"
 */
router.put('/usuarios/:id', UsuarioController.update);

router.get('/usuarios-sync', UsuarioController.syncModel);

module.exports = router;
