const express = require('express');
const router = express.Router();
const addLog = require('../middleware/logger');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario.model');

/**
 * @swagger
 * tags:
 *   name: Login 
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     tags: [Login]
 *     description: "Rota para login e geração de token de acesso.<p>Para inserir novos usuários acesse <code>/api/usuarios</code></p>"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@admin
 *               senha:
 *                 type: string
 *                 example: intell01
 *     responses:
 *       200:
 *         description: Login bem-sucedido
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
 *                   example: Login bem-sucedido
 *                 token:
 *                   type: string
 *                   example: token
 *       400:
 *         description: Campos obrigatórios não enviados ou JSON malformado
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
 *                   example: Campos obrigatórios não enviados ou JSON malformado
 *       401:
 *         description: Senha incorreta
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
 *                   example: Senha incorreta
 *       403:
 *         description: Usuário desativado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 403
 *                 message:
 *                   type: string
 *                   example: Usuário desativado
 *       404:
 *         description: Usuário não encontrado
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
 *                   example: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
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


router.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ status: 400, message: 'Campos obrigatórios não enviados.' });
        }

        if (email === process.env.MASTER_EMAIL && senha === process.env.MASTER_PASS) {
            const token = jwt.sign(
                {
                    usuario_id: 1000,
                    usuario_nome: process.env.MASTER_USER,
                    usuario_email: process.env.MASTER_EMAIL,
                    usuario_nivel: 1
                },
                process.env.SECRET_KEY,
                { expiresIn: process.env.TOKEN_TIME }
            );
            addLog('log_access', `${process.env.MASTER_USER} - ${process.env.MASTER_EMAIL}`)
            return res.status(200).json({ message: 'Login bem-sucedido.', token });
        }

        const usuario = await Usuario.findOne({ where: { usuario_email: email } });

        if (!usuario) {
            return res.status(404).json({ status: 404, message: 'Usuário não encontrado.' });
        }

        if (!usuario.usuario_ativo) {
            return res.status(403).json({ status: 403, message: 'Usuário desativado.' });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.usuario_senha);
        if (!senhaValida) {
            return res.status(401).json({ status: 401, message: 'Senha incorreta.' });
        }

        const token = jwt.sign(
            {
                usuario_id: usuario.usuario_id,
                usuario_nome: usuario.usuario_nome,
                usuario_email: usuario.usuario_email,
                usuario_nivel: usuario.usuario_nivel
            },
            process.env.SECRET_KEY,
            { expiresIn: process.env.TOKEN_TIME }
        );
        addLog('log_access', `${usuario.usuario_nome} - ${usuario.usuario_email}`)
        return res.status(200).json({ message: 'Login bem-sucedido.', token });

    } catch (error) {
        addLog('error_login', error.message);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

module.exports = router;