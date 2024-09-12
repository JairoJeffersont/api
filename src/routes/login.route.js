const express = require('express');
const router = express.Router();
const addLog = require('../middleware/logger');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario.model');

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
            addLog('log_access', `${process.env.MASTER_USER} - ${process.env.MASTER_EMAIL} - token ${token}`)
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
        addLog('log_access', `${usuario.usuario_nome} - ${usuario.usuario_email} - token ${token}`)
        return res.status(200).json({ message: 'Login bem-sucedido.', token });

    } catch (error) {
        addLog('error_login', error.message);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

module.exports = router;