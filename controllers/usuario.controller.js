const Usuario = require('../models/usuario.model');
const addLog = require('../middleware/logger');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const { Op } = require('sequelize');

class UsuarioController {

    async create(req, res) {
        try {
            const { usuario_nome, usuario_email, usuario_senha, usuario_aniversario, usuario_telefone, usuario_nivel, usuario_ativo } = req.body;

            if (!usuario_nome || !usuario_email || !usuario_senha || !usuario_aniversario || !usuario_telefone || !usuario_nivel || !usuario_ativo) {
                return res.status(400).json({ status: 400, message: 'Todos os campos são obrigatórios' });
            }

            const hashedPassword = await bcrypt.hash(usuario_senha, 10);

            await Usuario.create({
                usuario_nome,
                usuario_email,
                usuario_senha: hashedPassword,
                usuario_aniversario,
                usuario_telefone,
                usuario_nivel,
                usuario_ativo
            });

            return res.status(201).json({ status: 201, message: 'Usuário criado com sucesso.' });

        } catch (err) {
            if (err.original && err.original.errno === 1062) {
                return res.status(409).json({ status: 409, message: 'Esse usuário já está cadastrado' });
            }

            addLog('error_user', err.message);
            return res.status(500).json({ status: 500, message: 'Erro interno do servidor' });
        }
    }

    async update(req, res) {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({ status: 400, message: 'ID do usuário não enviado ou inválido' });
        }

        try {
            const [updated] = await Usuario.update(req.body, {
                where: { 'usuario_id': id },
            });

            if (!updated) {
                return res.status(404).json({ status: 404, message: 'Usuário não encontrado ou nenhum dado atualizado' });
            }

            return res.status(200).json({ status: 200, message: 'Usuário atualizado com sucesso.' });
        } catch (err) {
            addLog('error_user', err.message);
            return res.status(500).json({ status: 500, message: 'Erro interno do servidor' });
        }
    }

    async find(req, res) {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({ status: 400, message: 'ID do usuário não enviado ou inválido' });
        }

        try {
            const usuario = await Usuario.findByPk(id, {
                attributes: { exclude: ['usuario_senha'] }
            });

            if (!usuario) {
                return res.status(204).json({ status: 204, message: 'Usuário não encontrado' });
            }

            return res.status(200).json({ status: 200, message: 'Usuário encontrado', dados: usuario });

        } catch (error) {
            addLog('error_user', error.message);
            return res.status(500).json({ status: 500, message: 'Erro interno do servidor' });
        }
    }

    async list(req, res) {
        
        try {
            const { pagina = 1, itens = 10, ordem = 'ASC', ordernarPor = 'usuario_nome' } = req.query;
            const offset = (pagina - 1) * itens;

            if (ordernarPor !== 'usuario_nome') {
                return res.status(400).json({ status: 400, message: "Parametro 'ordenarPor' inválido" });
            }

            const { count, rows } = await Usuario.findAndCountAll({
                where: {
                    usuario_id: {
                        [Op.ne]: 1000
                    }
                },
                order: [[ordernarPor, ordem]],
                attributes: { exclude: ['usuario_senha'] },
                limit: Number(itens),
                offset: Number(offset)
            });

            if (rows.length === 0) {
                return res.status(204).json({ status: 204, message: 'Nenhum usuário registrado' });
            }

            const lastPage = Math.ceil(count / itens);

            const links = {
                first: `${req.protocol}://${req.hostname}/api/usuarios?itens=${itens}&pagina=1&ordem=${ordem}&ordernarPor=${ordernarPor}`,
                self: `${req.protocol}://${req.hostname}/api/usuarios?itens=${itens}&pagina=${pagina}&ordem=${ordem}&ordernarPor=${ordernarPor}`,
                last: `${req.protocol}://${req.hostname}/api/usuarios?itens=${itens}&pagina=${lastPage}&ordem=${ordem}&ordernarPor=${ordernarPor}`
            }

            return res.status(200).json({ status: 200, message: `${count} usuário(s) encontrado(s)`, dados: rows, links });
        } catch (error) {
            addLog('error_user', error.message);
            return res.status(500).json({ status: 500, message: 'Erro interno do servidor' });
        }
    }

    async delete(req, res) {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({ status: 400, message: 'ID do usuário não enviado ou inválido' });
        }

        try {
            const usuario = await Usuario.findByPk(id);

            if (!usuario) {
                return res.status(204).json({ status: 204, message: 'Usuário não encontrado' });
            }

            await usuario.destroy();

            return res.status(200).json({ status: 200, message: 'Usuário apagado com sucesso' });
        } catch (error) {
            if (error.original && error.original.errno === 1451) {
                return res.status(409).json({ status: 409, message: 'Não é possível apagar esse usuário porque ele está referenciado em outras tabelas.' });
            }
            addLog('error_user', error.message);
            return res.status(500).json({ status: 500, message: 'Erro interno do servidor' });
        }
    }

    async syncModel(req, res) {
        try {
            const hashedPassword = await bcrypt.hash(process.env.MASTER_PASS, 10);
            await Usuario.sync({ alter: true });
            await Usuario.findOrCreate({
                where: { usuario_id: 1000 },
                defaults: {
                    usuario_nome: process.env.MASTER_USER,
                    usuario_email: process.env.MASTER_EMAIL,
                    usuario_senha: hashedPassword,
                    usuario_telefone: 0,
                    usuario_aniversario: '2000-01-01',
                    usuario_ativo: 1,
                    usuario_nivel: 1
                }
            });
            return res.status(200).json({ status: 200, message: 'Modelo sincronizado com sucesso' });
        } catch (error) {
            addLog('error_user', error.message);
            return res.status(500).json({ status: 500, message: 'Erro interno do servidor' });
        }
    }
}

module.exports = new UsuarioController();
