const { TipoOrgao } = require('../models/orgao.model');
const addLog = require('../middleware/logger');
const fs = require('fs'); 
const path = require('path'); 

class TipoOrgaoController {

    async create(req, res) {
        try {
            const tipoOrgao = req.body;

            if (!tipoOrgao.orgao_tipo_nome || !tipoOrgao.orgao_tipo_descricao) {
                return res.status(400).json({ status: 400, message: 'Todos os campos obrigatórios devem ser preenchidos' });
            }

            await TipoOrgao.create(tipoOrgao);
            return res.status(201).json({ status: 201, message: 'Tipo de órgão criado com sucesso.' });

        } catch (err) {
            if (err.original && err.original.errno === 1062) {
                return res.status(409).json({ status: 409, message: 'Esse tipo de órgão já está cadastrado' });
            }

            addLog('error_tipo_orgao', err.message);
            return res.status(500).json({ status: 500, message: 'Erro interno do servidor' });
        }
    }

    async list(req, res) {
        try {

            const { count, rows } = await TipoOrgao.findAndCountAll({
                order: [['orgao_tipo_nome', 'asc']]
            });

            if (rows.length === 0) {
                return res.status(200).json({ status: 200, message: 'Nenhum tipo de órgão registrado' });
            }

            return res.status(200).json({ status: 200, message: `${count} tipo(s) de órgão encontrado`, dados: rows });
        } catch (error) {
            addLog('error_tipo_orgao', error.message);
            return res.status(500).json({ status: 500, message: 'Erro interno do servidor' });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            const tipo = await TipoPessoa.TipoOrgao(id);

            if (!tipo) {
                return res.status(404).json({ status: 404, message: 'Tipo de órgão não encontrado' });
            }

            await tipo.destroy();

            return res.status(200).json({ status: 200, message: 'Tipo de pessoa órgão com sucesso' });
        } catch (error) {
            if (error.original && error.original.errno === 1451) {
                return res.status(409).json({ status: 409, message: 'Não é possível apagar esse tipo de órgão porque ele está referenciado em outras tabelas.' });
            }

            addLog('error_tipo_orgao', error.message);
            return res.status(500).json({ status: 500, message: 'Erro interno do servidor' });
        }
    }

    async syncModel() {
        try {
            await TipoOrgao.sync({ alter: true });
    
            const filePath = path.join(__dirname, '../json/tipos_orgaos.json'); 
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const data = JSON.parse(fileContent);
    
            for (const item of data) {
                await TipoOrgao.findOrCreate({
                    where: { orgao_tipo_id: item.orgao_tipo_id },
                    defaults: {
                        orgao_tipo_nome: item.orgao_tipo_nome,
                        orgao_tipo_descricao: item.orgao_tipo_descricao
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

module.exports = new TipoOrgaoController();
