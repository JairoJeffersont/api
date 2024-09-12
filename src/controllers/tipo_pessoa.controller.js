const { TipoPessoa } = require('../models/pessoa.model');
const addLog = require('../middleware/logger');
const fs = require('fs'); 
const path = require('path'); 

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
                return res.status(200).json({ status: 200, message: 'Nenhum tipo de pessoa registrado' });
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
    
            const filePath = path.join(__dirname, '../json/tipos_pessoas.json'); 
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const data = JSON.parse(fileContent);
    
            for (const item of data) {
                await TipoPessoa.findOrCreate({
                    where: { tipo_pessoa_id: item.tipo_pessoa_id },
                    defaults: {
                        tipo_pessoa_nome: item.tipo_pessoa_nome,
                        tipo_pessoa_descricao: item.tipo_pessoa_descricao
                    }
                });
            }
    
            return { status: 200, message: 'Modelo sincronizado com sucesso' };
        } catch (error) {
            addLog('error_orgao', error.message);
            return { status: 500, message: 'Erro interno do servidor' };
        }
    }

}

module.exports = new TipoPessoaController();
