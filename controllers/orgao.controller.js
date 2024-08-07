const { Orgao, TipoOrgao, Usuario } = require('../models/orgao.model');
const addLog = require('../middleware/logger');
const { Op } = require('sequelize');

class OrgaoController {

    async create(req, res) {
        try {
            const orgao = req.body;

            if (!orgao.orgao_nome || !orgao.orgao_email || !orgao.orgao_municipio || !orgao.orgao_estado || !orgao.orgao_tipo) {
                return res.status(400).json({ status: 400, message: 'Todos os campos obrigatórios devem ser preenchidos' });
            }

            orgao.orgao_criado_por = req.user.usuario_id;

            await Orgao.create(orgao);
            return res.status(201).json({ status: 201, message: 'Órgão criado com sucesso.' });

        } catch (err) {
            if (err.original) {

                if (err.original.errno === 1062) {
                    return res.status(409).json({ status: 409, message: 'Esse órgão já está cadastrado' });
                }
                if (err.original.errno === 1452) {
                    return res.status(409).json({ status: 409, message: 'O tipo de órgão ou ID do usuário está incorreto' });
                }
            }

            addLog('error_orgao', err.message);
            return res.status(500).json({ status: 500, message: 'Erro interno do servidor' });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;

            const [updated] = await Orgao.update(req.body, {
                where: { orgao_id: id },
            });

            if (!updated) {
                return res.status(404).json({ status: 404, message: 'Órgão não encontrado ou nenhum dado atualizado' });
            }

            return res.status(200).json({ status: 200, message: 'Órgão atualizado com sucesso.' });
        } catch (err) {
            if (err.original && err.original.errno === 1452) {
                return res.status(409).json({ status: 409, message: 'O tipo de órgão ou ID do usuário está incorreto' });
            }

            addLog('error_orgao', err.message);
            return res.status(500).json({ status: 500, message: 'Erro interno do servidor' });
        }
    }

    async list(req, res) {
        try {
            const { pagina = 1, itens = 10, ordem = 'ASC', ordernarPor = 'orgao_nome' } = req.query;
            const offset = (pagina - 1) * itens;

            const { count, rows } = await Orgao.findAndCountAll({
                where: {
                    orgao_id: {
                        [Op.ne]: 1
                    }
                },
                order: [[ordernarPor, ordem]],
                limit: Number(itens),
                offset: Number(offset),
                include: [
                    {
                        model: TipoOrgao,
                        as: 'TipoOrgao',
                        attributes: ['orgao_tipo_id', 'orgao_tipo_nome']
                    },
                    {
                        model: Usuario,
                        as: 'Usuario',
                        attributes: ['usuario_id', 'usuario_nome']
                    }
                ]
            });

            if (rows.length === 0) {
                return res.status(404).json({ status: 404, message: 'Nenhum órgão registrado' });
            }

            const lastPage = Math.ceil(count / itens);

            const links = {
                first: `${req.protocol}://${req.hostname}/api/orgaos?itens=${itens}&pagina=1&ordem=${ordem}&ordernarPor=${ordernarPor}`,
                self: `${req.protocol}://${req.hostname}/api/orgaos?itens=${itens}&pagina=${pagina}&ordem=${ordem}&ordernarPor=${ordernarPor}`,
                last: `${req.protocol}://${req.hostname}/api/orgaos?itens=${itens}&pagina=${lastPage}&ordem=${ordem}&ordernarPor=${ordernarPor}`
            }

            return res.status(200).json({ status: 200, message: `${count} órgão(s) encontrado(s)`, dados: rows, links });
        } catch (error) {
            addLog('error_orgao', error.message);
            return res.status(500).json({ status: 500, message: 'Erro interno do servidor' });
        }
    }

    async find(req, res) {
        try {
            const { id } = req.params;

            const orgao = await Orgao.findByPk(id, {
                include: [
                    {
                        model: TipoOrgao,
                        as: 'TipoOrgao',
                        attributes: ['orgao_tipo_id', 'orgao_tipo_nome']
                    },
                    {
                        model: Usuario,
                        as: 'Usuario',
                        attributes: ['usuario_id', 'usuario_nome']
                    }
                ]
            });

            if (!orgao) {
                return res.status(404).json({ status: 404, message: 'Órgão não encontrado' });
            }

            return res.status(200).json({ status: 200, message: 'Órgão encontrado', dados: orgao });

        } catch (error) {
            addLog('error_orgao', error.message);
            return res.status(500).json({ status: 500, message: 'Erro interno do servidor' });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            const orgao = await Orgao.findByPk(id);

            if (!orgao) {
                return res.status(404).json({ status: 404, message: 'Órgão não encontrado' });
            }

            await orgao.destroy();

            return res.status(200).json({ status: 200, message: 'Órgão apagado com sucesso' });
        } catch (error) {
            if (error.original && error.original.errno === 1451) {
                return res.status(409).json({ status: 409, message: 'Não é possível apagar o órgão porque ele está referenciado em outras tabelas.' });
            }
            addLog('error_orgao', error.message);
            return res.status(500).json({ status: 500, message: 'Erro interno do servidor' });
        }
    }

    async search(req, res) {
        try {
            const { nome } = req.query;
            const nomeBusca = `%${nome}%`; 
    
            const orgaos = await Orgao.findAll({
                where: {
                    orgao_nome: {
                        [Op.like]: nomeBusca
                    }
                },
                include: [
                    {
                        model: TipoOrgao,
                        as: 'TipoOrgao',
                        attributes: ['orgao_tipo_id', 'orgao_tipo_nome']
                    },
                    {
                        model: Usuario,
                        as: 'Usuario',
                        attributes: ['usuario_id', 'usuario_nome']
                    }
                ]
            });
    
            if (orgaos.length === 0) {
                return res.status(204).json({ status: 204, message: 'Nenhum órgão encontrado' });
            }
    
            return res.status(200).json({ status: 200, message: `${orgaos.length} órgão(s) encontrado(s)`, dados: orgaos });
    
        } catch (error) {
            addLog('error_orgao', error.message);
            return res.status(500).json({ status: 500, message: 'Erro interno do servidor' });
        }
    }

    async syncModel(req, res) {
        try {
            await TipoOrgao.sync({ alter: true });
            await TipoOrgao.findOrCreate({
                where: { orgao_tipo_id: 1 },
                defaults: {
                    orgao_tipo_nome: 'Sem tipo definido',
                    orgao_tipo_descricao: 'Órgão sem um tipo definido'
                }
            });

            await Orgao.sync({ alter: true });
            await Orgao.findOrCreate({
                where: { orgao_id: 1 },
                defaults: {
                    orgao_nome: 'Sem órgão definido',
                    orgao_email: 'email@email',
                    orgao_municipio: 'bsb',
                    orgao_estado: 'df',
                    orgao_tipo: 1,
                    orgao_criado_por: 1000
                }
            });

            return res.status(200).json({ status: 200, message: 'Modelo sincronizado com sucesso' });
        } catch (error) {
            addLog('error_orgao', error.message);
            return res.status(500).json({ status: 500, message: 'Erro interno do servidor' });
        }
    }

}

module.exports = new OrgaoController();
