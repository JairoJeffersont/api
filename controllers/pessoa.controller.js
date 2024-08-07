const { Pessoa, TipoPessoa, Usuario, Orgao } = require('../models/pessoa.model');
const addLog = require('../middleware/logger');
const { Op } = require('sequelize');

class PessoaController {

    async create(req, res) {
        try {

            const pessoa = req.body;
            await Pessoa.create(pessoa);
            return res.status(201).json({ status: 201, message: 'Pessoa criada com sucesso.' });

        } catch (err) {

            if (err.original && err.original.errno == 1062) {
                return res.status(409).json({ status: 409, message: 'Essa pessoa já está cadastrado' });
            }

            if (err.original && err.original.errno == 1452) {
                return res.status(409).json({ status: 409, message: 'O tipo de pessoa ou ID do usuário está incorreto' });
            }

            console.log(err);

            if (err.errors) {
                const hasNotNullViolation = err.errors.some(error => error.type === "notNull Violation");
                if (hasNotNullViolation) {
                    return res.status(400).json({ status: 400, message: 'Preencha todos os campos obrigatórios' });
                }
            }

            addLog('error_people', err.message);
            return res.status(500).json({ status: 500, message: 'Erro interno do servidor' });
        }

    }

    async update(req, res) {
        try {
            const { id } = req.params;

            const [updated] = await Pessoa.update(req.body, {
                where: { 'pessoa_id': id },
            });

            if (!updated) {
                return res.status(404).json({ status: 404, message: 'Pessoa não encontrada ou nenhum dado atualizado' });
            }

            return res.status(200).json({ status: 200, message: 'Pessoa atualizado com sucesso.' });
        } catch (err) {

            if (err.original && err.original.errno == 1452) {
                return res.status(409).json({ status: 409, message: 'O tipo de pessoa ou ID do usuário está incorreto' });
            }

            addLog('error_user', err.message);
            return res.status(500).json({ status: 500, message: 'Erro interno do servidor' });
        }
    }

    async list(req, res) {
        try {
            const { pagina = 1, itens = 10, ordem = 'ASC', ordernarPor = 'pessoa_nome' } = req.query;
            const offset = (pagina - 1) * itens;

            const { count, rows } = await Pessoa.findAndCountAll({
                order: [[ordernarPor, ordem]],
                limit: Number(itens),
                offset: Number(offset),
                include: [
                    {
                        model: TipoPessoa,
                        as: 'TipoPessoa',
                        attributes: ['tipo_pessoa_id', 'tipo_pessoa_nome']
                    },
                    {
                        model: Orgao,
                        as: 'Orgao',
                        attributes: ['orgao_id', 'orgao_nome']
                    },
                    {
                        model: Usuario,
                        as: 'Usuario',
                        attributes: ['usuario_id', 'usuario_nome']
                    }
                ]
            });


            if (rows.length === 0) {
                return res.status(200).json({ status: 204, message: 'Nenhuma pessoa registrado' });
            }

            const lastPage = Math.ceil(count / itens);

            const links = {
                first: `${req.protocol}://${req.hostname}/api/pessoas?itens=${itens}&pagina=1&ordem=${ordem}&ordernarPor=${ordernarPor}`,
                self: `${req.protocol}://${req.hostname}/api/pessoas?itens=${itens}&pagina=${pagina}&ordem=${ordem}&ordernarPor=${ordernarPor}`,
                last: `${req.protocol}://${req.hostname}/api/pessoas?itens=${itens}&pagina=${lastPage}&ordem=${ordem}&ordernarPor=${ordernarPor}`
            }

            return res.status(200).json({ status: 200, message: `${count} pessoa(as) encontrada(as)`, dados: rows, links });
        } catch (error) {
            addLog('error_user', error.message);
            return res.status(400).json({ status: 500, message: 'Erro interno do servidor' });
        }
    }

    async find(req, res) {
        try {
            const pessoas = await Pessoa.findByPk(req.params.id, {
                include: [
                    {
                        model: TipoPessoa,
                        as: 'TipoPessoa',
                        attributes: ['tipo_pessoa_id', 'tipo_pessoa_nome']
                    },
                    {
                        model: Orgao,
                        as: 'Orgao',
                        attributes: ['orgao_id', 'orgao_nome']
                    },
                    {
                        model: Usuario,
                        as: 'Usuario',
                        attributes: ['usuario_id', 'usuario_nome']
                    }
                ]
            });

            if (!pessoas) {
                return res.status(200).json({ status: 204, message: 'Pessoa não encontrada' });
            }

            return res.status(200).json({ status: 200, message: `Pessoa encontrada`, dados: pessoas });

        } catch (error) {
            addLog('error_user', error.message);
            return res.status(400).json({ status: 500, message: 'Erro interno do servidor' });
        }
    }

    async syncModel(req, res) {

        try {
            await TipoPessoa.sync({ alter: true });
            await TipoPessoa.findOrCreate({
                where: { tipo_pessoa_id: 1 },
                defaults: {
                    tipo_pessoa_nome: 'Sem tipo definido',
                    tipo_pessoa_descricao: 'Sem um tipo de pessoa definido'
                }
            });
            await Pessoa.sync({ alter: true });
            return res.status(200).json({ status: 200, message: 'Modelo sincronizado com sucesso' });
        } catch (error) {
            addLog('error_people', error.message);
            return res.status(500).json({ status: 500, message: 'Erro interno do servidor' });
        }
    }

    async delete(req, res) {
        try {
            const pessoa = await Pessoa.findByPk(req.params.id);

            if (!pessoa) {
                return res.status(200).json({ status: 200, message: 'Pessoa não encontrada' });
            }

            await pessoa.destroy();

            return res.status(200).json({ status: 200, message: 'Pessoa apagada com sucesso' });
        } catch (error) {
            addLog('error_user', error.message);
            return res.status(500).json({ status: 500, message: 'Erro interno do servidor' });
        }
    }

}

module.exports = new PessoaController();