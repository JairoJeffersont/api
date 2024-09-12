const { Pessoa, TipoPessoa, Usuario, Orgao } = require('../models/pessoa.model');
const addLog = require('../middleware/logger');
const { Op } = require('sequelize');
require('dotenv').config();


class PessoaController {

    async create(req, res) {
        try {
            const pessoa = req.body;

            if (!pessoa.pessoa_nome || !pessoa.pessoa_email || !pessoa.pessoa_municipio || !pessoa.pessoa_estado || !pessoa.pessoa_estado || !pessoa.pessoa_tipo || !pessoa.pessoa_orgao) {
                return res.status(400).json({ status: 400, message: 'Todos os campos obrigatórios devem ser preenchidos' });
            }

            if (!validator.isEmail(pessoa_email)) {
                return res.status(400).json({ status: 400, message: 'E-mail inválido' });
            }

            pessoa.pessoa_criada_por = req.user.usuario_id;

            await Pessoa.create(pessoa);
            return res.status(201).json({ status: 201, message: 'Pessoa criada com sucesso.' });

        } catch (err) {
            if (err.original && err.original.errno === 1062) {
                return res.status(409).json({ status: 409, message: 'Essa pessoa já está cadastrada' });
            }

            if (err.original && err.original.errno === 1452) {
                return res.status(409).json({ status: 409, message: 'O tipo de pessoa ou ID do usuário está incorreto' });
            }

            addLog('error_pessoa', err.message);
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

            return res.status(200).json({ status: 200, message: 'Pessoa atualizada com sucesso.' });
        } catch (err) {
            if (err.original && err.original.errno === 1452) {
                return res.status(409).json({ status: 409, message: 'O tipo de pessoa ou ID do usuário está incorreto' });
            }

            addLog('error_pessoa', err.message);
            return res.status(500).json({ status: 500, message: 'Erro interno do servidor' });
        }
    }

    async list(req, res) {
        try {
            const { pagina = 1, itens = 10, ordem = 'ASC', ordernarPor = 'pessoa_nome', filtro = 'false', busca = '' } = req.query;
            const offset = (pagina - 1) * itens;
    
            const aplicarFiltro = filtro.toLowerCase() === 'true';
            
            // Condição base para o filtro
            const whereCondition = aplicarFiltro ? { pessoa_estado: process.env.ESTADO_DEPUTADO } : {};
    
            // Adicionando a condição de busca se 'busca' não estiver vazio
            if (busca.trim() !== '') {
                whereCondition.pessoa_nome = {
                    [Op.like]: `%${busca}%` // Utilizando like para busca
                };
            }
    
            const { count, rows } = await Pessoa.findAndCountAll({
                where: whereCondition,
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
                return res.status(200).json({ status: 200, message: 'Nenhuma pessoa registrada' });
            }
    
            const lastPage = Math.ceil(count / itens);
    
            const links = {
                first: `${req.protocol}://${req.hostname}/api/pessoas?itens=${itens}&pagina=1&ordem=${ordem}&ordernarPor=${ordernarPor}&filtro=${filtro}${busca ? `&busca=${busca}` : ''}`,
                self: `${req.protocol}://${req.hostname}/api/pessoas?itens=${itens}&pagina=${pagina}&ordem=${ordem}&ordernarPor=${ordernarPor}&filtro=${filtro}${busca ? `&busca=${busca}` : ''}`,
                last: `${req.protocol}://${req.hostname}/api/pessoas?itens=${itens}&pagina=${lastPage}&ordem=${ordem}&ordernarPor=${ordernarPor}&filtro=${filtro}${busca ? `&busca=${busca}` : ''}`,
            }
    
            return res.status(200).json({ status: 200, message: `${count} pessoa(s) encontrada(s)`, dados: rows, links });
        } catch (error) {
            addLog('error_pessoa', error.message);
            return res.status(500).json({ status: 500, message: 'Erro interno do servidor' });
        }
    }
    


    async find(req, res) {
        try {
            const pessoa = await Pessoa.findByPk(req.params.id, {
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

            if (!pessoa) {
                return res.status(404).json({ status: 404, message: 'Pessoa não encontrada' });
            }

            return res.status(200).json({ status: 200, message: 'Pessoa encontrada', dados: pessoa });

        } catch (error) {
            addLog('error_pessoa', error.message);
            return res.status(500).json({ status: 500, message: 'Erro interno do servidor' });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            const pessoa = await Pessoa.findByPk(id);

            if (!pessoa) {
                return res.status(404).json({ status: 404, message: 'Pessoa não encontrada' });
            }

            await pessoa.destroy();
            if (pessoa.pessoa_foto) {
                const fotoPath = './public' + pessoa.pessoa_foto;

                fs.unlink(fotoPath, (err) => {
                    if (err) {
                        console.error('Erro ao remover o arquivo da foto:', err);
                    }
                });
            }

            return res.status(200).json({ status: 200, message: 'Pessoa apagada com sucesso' });
        } catch (error) {
            if (error.original && error.original.errno === 1451) {
                return res.status(409).json({ status: 409, message: 'Não é possível apagar a pessoa porque ela está referenciada em outras tabelas.' });
            }

            addLog('error_pessoa', error.message);
            return res.status(500).json({ status: 500, message: 'Erro interno do servidor' });
        }
    }



    async search(req, res) {
        try {
            const { pagina = 1, itens = 10, ordem = 'ASC', ordernarPor = 'pessoa_nome' } = req.query;
            const offset = (pagina - 1) * itens;
            const nomeBusca = `%${req.query.nome}%`;

            const totalCount = await Pessoa.count({
                where: {
                    pessoa_nome: {
                        [Op.like]: nomeBusca
                    }
                }
            });

            const rows = await Pessoa.findAll({
                where: {
                    pessoa_nome: {
                        [Op.like]: nomeBusca
                    }
                },
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
                return res.status(200).json({ status: 200, message: 'Nenhuma pessoa registrada' });
            }

            const lastPage = Math.ceil(totalCount / itens);

            const links = {
                first: `${req.protocol}://${req.hostname}/api/pessoas?itens=${itens}&pagina=1&ordem=${ordem}&ordernarPor=${ordernarPor}`,
                self: `${req.protocol}://${req.hostname}/api/pessoas?itens=${itens}&pagina=${pagina}&ordem=${ordem}&ordernarPor=${ordernarPor}`,
                last: `${req.protocol}://${req.hostname}/api/pessoas?itens=${itens}&pagina=${lastPage}&ordem=${ordem}&ordernarPor=${ordernarPor}`
            }

            return res.status(200).json({ status: 200, message: `${rows.length} pessoa(s) encontrada(s)`, dados: rows, links });
        } catch (error) {
            addLog('error_pessoa', error.message);
            return res.status(500).json({ status: 500, message: 'Erro interno do servidor' });
        }
    }

    async syncModel() {
        try {

            await Pessoa.sync({ alter: true });

            return { status: 200, message: 'Modelo sincronizado com sucesso' };
        } catch (error) {
            addLog('error_pessoa', error.message);
            return { status: 500, message: 'Erro interno do servidor' };
        }
    }

}

module.exports = new PessoaController();
