const { TipoPessoa } = require('../models/pessoa.model');
const addLog = require('../middleware/logger');

class TipoPessoaController {

    async create(req, res) {
        try {
            const tipoPessoa = req.body;

            if (!tipoPessoa.tipo_pessoa_nome || !tipoPessoa.tipo_pessoa_descricao) {
                return res.status(400).json({ status: 400, message: 'Todos os campos obrigatórios devem ser preenchidos' });
            }


            await TipoPessoa.create(tipoPessoa);
            return res.status(201).json({ status: 201, message: 'Tipo de Pessoa criado com sucesso.' });

        } catch (err) {
            if (err.original && err.original.errno === 1062) {
                return res.status(409).json({ status: 409, message: 'Esse tipo de pessoa já está cadastrado' });
            }

            addLog('error_tipo_pessoa', err.message);
            return res.status(500).json({ status: 500, message: 'Erro interno do servidor' });
        }
    }

    async list(req, res) {
        try {

            const { count, rows } = await TipoPessoa.findAndCountAll({
                order: [['tipo_pessoa_nome', 'asc']]
            });

            if (rows.length === 0) {
                return res.status(204).json({ status: 204, message: 'Nenhum tipo de pessoa registrado' });
            }

            return res.status(200).json({ status: 200, message: `${count} tipo(s) de pessoa encontrado`, dados: rows });
        } catch (error) {
            addLog('error_tipo_pessoa', error.message);
            return res.status(500).json({ status: 500, message: 'Erro interno do servidor' });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            const tipo = await TipoPessoa.findByPk(id);

            if (!tipo) {
                return res.status(404).json({ status: 404, message: 'Tipo de pessoa não encontrado' });
            }

            await tipo.destroy();

            return res.status(200).json({ status: 200, message: 'Tipo de pessoa apagado com sucesso' });
        } catch (error) {
            if (error.original && error.original.errno === 1451) {
                return res.status(409).json({ status: 409, message: 'Não é possível apagar esse tipo de pessoa porque ele está referenciado em outras tabelas.' });
            }

            addLog('error_tipo_pessoa', error.message);
            return res.status(500).json({ status: 500, message: 'Erro interno do servidor' });
        }
    }

    async syncModel() {
        try {
            await TipoPessoa.sync({ alter: true });
            await TipoPessoa.findOrCreate({
                where: { tipo_pessoa_id: 1 },
                defaults: {
                    tipo_pessoa_nome: 'Sem tipo definido',
                    tipo_pessoa_descricao: 'Sem um tipo de pessoa definido'
                }
            });
            return { status: 200, message: 'Modelo sincronizado com sucesso' };
        } catch (error) {
            addLog('error_pessoa', error.message);
            return { status: 500, message: 'Erro interno do servidor' };
        }
    }

}

module.exports = new TipoPessoaController();
