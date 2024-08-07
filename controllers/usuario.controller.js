const Usuario = require('../models/usuario.model');
const addLog = require('../middleware/logger');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const { Op } = require('sequelize');


class UsuarioController {

    async create(req, res) {
        try {
            const usuario = req.body;
            usuario.usuario_senha = await bcrypt.hash(usuario.usuario_senha, 10);
            await Usuario.create(usuario);
            return res.status(201).json({ status: 201, message: 'Usuário criado com sucesso.' });

        } catch (err) {

            if (err.original && err.original.errno == 1062) {
                return res.status(409).json({ status: 409, message: 'Esse usuário já está cadastrado' });
            }

            console.log(err);

            if (err.errors) {
                const hasNotNullViolation = err.errors.some(error => error.type === "notNull Violation");
                if (hasNotNullViolation) {
                    return res.status(400).json({ status: 400, message: 'Preencha todos os campos obrigatórios' });
                }
            }

            addLog('error_user', err.message);
            return res.status(500).json({ status: 500, message: 'Erro interno do servidor' });
        }

    }

    async update(req, res) {
        try {
            const { id } = req.params;

            if (!req.params.id || isNaN(req.params.id)) {
                return res.status(400).json({ status: 400, message: 'ID do usuário não enviado ou inválido' });
            }


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

        try {

            if (!req.params.id || isNaN(req.params.id)) {
                return res.status(400).json({ status: 400, message: 'ID do usuário não enviado ou inválido' });
            }

            const usuario = await Usuario.findByPk(req.params.id, {
                attributes: { exclude: ['usuario_senha'] }
            });

            if (!usuario) {
                return res.status(204).json({ status: 204, message: 'Usuário não encontrado' });
            }

            return res.status(200).json({ status: 200, message: `Usuário encontrado`, dados: usuario });

        } catch (error) {
            addLog('error_user', error.message);
            return res.status(400).json({ status: 500, message: 'Erro interno do servidor' });
        }

    }

    async list(req, res) {
        try {
            const { pagina = 1, itens = 10, ordem = 'ASC', ordernarPor = 'usuario_nome' } = req.query;
            const offset = (pagina - 1) * itens;

            if (ordernarPor != 'usuario_nome') {
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
                return res.status(200).json({ status: 204, message: 'Nenhum usuário registrado' });
            }

            const lastPage = Math.ceil(count / itens);

            const links = {
                first: `${req.protocol}://${req.hostname}/api/usuarios?itens=${itens}&pagina=1&ordem=${ordem}&ordernarPor=${ordernarPor}`,
                self: `${req.protocol}://${req.hostname}/api/usuarios?itens=${itens}&pagina=${pagina}&ordem=${ordem}&ordernarPor=${ordernarPor}`,
                last: `${req.protocol}://${req.hostname}/api/usuarios?itens=${itens}&pagina=${lastPage}&ordem=${ordem}&ordernarPor=${ordernarPor}`
            }

            return res.status(200).json({ status: 200, message: `${count} usuário(os) encontrado(os)`, dados: rows, links });
        } catch (error) {
            addLog('error_user', error.message);
            return res.status(400).json({ status: 500, message: 'Erro interno do servidor' });
        }
    }

    async delete(req, res) {
        try {
            const usuario = await Usuario.findByPk(req.params.id);

            if (!req.params.id || isNaN(req.params.id)) {
                return res.status(400).json({ status: 400, message: 'ID do usuário não enviado ou inválido' });
            }


            if (!usuario) {
                return res.status(200).json({ status: 204, message: 'Usuário não encontrado' });
            }

            await usuario.destroy();

            return res.status(200).json({ status: 200, message: 'Usuário apagado com sucesso' });
        } catch (error) {
            addLog('error_user', error.message);
            return res.status(500).json({ status: 500, message: 'Erro interno do servidor' });
        }
    }

    async syncModel(req, res) {
        try {
            await Usuario.sync({ alter: true });
            await Usuario.findOrCreate({
                where: { usuario_id: 1000 },
                defaults: {
                    usuario_nome: process.env.MASTER_USER,
                    usuario_email: process.env.MASTER_EMAIL,
                    usuario_senha: process.env.MASTER_PASS,
                    usuario_telefone: 0,
                    usuario_aniversario: '2000-01-01',
                    usuario_ativo: 1,
                    usuario_nivel: 1

                }
            });
            return res.status(200).json({ status: 200, message: 'Modelo sincronizado com sucesso' });
        } catch (error) {
            addLog('error_user', error.message);
            return res.status(400).json({ status: 500, message: 'Erro interno do servidor' });
        }
    }

}

module.exports = new UsuarioController();