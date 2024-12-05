const addLog = require('../middleware/logger');
const axios = require('axios');
require('dotenv').config();

class ProposicoesController {

    async ProposicoesDeputado(req, res) {

        const autor = Number(req.query.autor) || process.env.ID_DEPUTADO;
        const itens = Math.min(Number(req.query.itens) || 10, 100);
        const pagina = Number(req.query.pagina) || 1;
        const tipo = req.query.tipo || 'PL';
        const ordem = req.query.ordem && ['ASC', 'DESC'].includes(req.query.ordem.toUpperCase()) ? req.query.ordem.toUpperCase() : 'DESC';
        const ordenarPor = req.query.ordenarPor || 'id';
        const ano = req.query.ano || 2024;
        let response = '';

        try {

            if (ano == 0) {
                response = await axios.get(`${process.env.URL_API_CAMARA}/proposicoes?siglaTipo=${tipo}&idDeputadoAutor=${autor}&itens=${itens}&pagina=${pagina}&ordem=${ordem}&ordenarPor=${ordenarPor}`);
            } else {
                response = await axios.get(`${process.env.URL_API_CAMARA}/proposicoes?siglaTipo=${tipo}&idDeputadoAutor=${autor}&ano=${ano}&itens=${itens}&pagina=${pagina}&ordem=${ordem}&ordenarPor=${ordenarPor}`);
            }

            if (response.data.dados.length === 0) {
                return res.status(200).json({ status: 200, message: 'Nenhuma proposição encontrada.' });
            }

            const proposicoes = await Promise.all(response.data.dados.map(async (proposicao) => {
                const detalhes = await axios.get(`${process.env.URL_API_CAMARA}/proposicoes/${proposicao.id}`);
                const autoresResponse = await axios.get(`${process.env.URL_API_CAMARA}/proposicoes/${proposicao.id}/autores`);

                const autores = autoresResponse.data.dados.map(autor => ({
                    nome: autor.nome,
                    proponente: autor.proponente,
                    ordem_assinatura: autor.ordemAssinatura,
                    autoria_unica: autor.proponente === 1 && autor.ordemAssinatura === 1 ? true : false
                }));

                const autoriaUnica = autores.every(autor => autor.autoria_unica);

                return {
                    proposicao_id: proposicao.id,
                    proposicao_titulo: `${proposicao.siglaTipo} ${proposicao.numero}/${proposicao.ano}`,
                    proposicao_autoria_unica: autoriaUnica,
                    proposicao_numero: proposicao.numero,
                    proposicao_ano: proposicao.ano,
                    proposicao_tipo: proposicao.siglaTipo,
                    proposicao_ementa: proposicao.ementa,
                    proposicao_detalhes: {
                        data_apresentacao: detalhes.data.dados.dataApresentacao,
                        arquivado: detalhes.data.dados.statusProposicao.codSituacao === 923,
                        transformada_em_lei: detalhes.data.dados.statusProposicao.codSituacao === 1140,
                        documento: detalhes.data.dados.urlInteiroTeor
                    },
                    ...(autoriaUnica ? {} : { proposicao_autores: autores })
                };

            }));

            const totalItens = response.headers['x-total-count'];
            const ultimaPagina = Math.ceil(totalItens / itens);

            const links = {
                first: `${req.protocol}://${req.hostname}/api/proposicoes?ano=${ano}&itens=${itens}&pagina=1&tipo=${tipo}&ordem=${ordem}&ordenarPor=${ordenarPor}`,
                self: `${req.protocol}://${req.hostname}/api/proposicoes?ano=${ano}&itens=${itens}&pagina=${pagina}&tipo=${tipo}&ordem=${ordem}&ordenarPor=${ordenarPor}`,
                last: `${req.protocol}://${req.hostname}/api/proposicoes?ano=${ano}&itens=${itens}&pagina=${ultimaPagina}&tipo=${tipo}&ordem=${ordem}&ordenarPor=${ordenarPor}`
            };

            return res.status(200).json({ status: 200, dados: proposicoes, links });

        } catch (error) {
            addLog('error_proposicoes', error.message);
            return res.status(500).json({ status: 500, message: 'Erro interno do servidor' });
        }
    }

    async BuscarPrincipal(req, res) {
        try {
            const id = req.query.id;

            let uri = `${process.env.URL_API_CAMARA}/proposicoes/${id}`;

            const response = await axios.get(uri);
            const dados = response.data.dados;

            if (!dados.uriPropPrincipal) {
                return res.status(200).json({ status: 200, dados: [] });
            }

            while (uri) {
                const response = await axios.get(uri);
                const dados = response.data.dados;

                uri = dados.uriPropPrincipal || null;

                const autoresResponse = await axios.get(`${process.env.URL_API_CAMARA}/proposicoes/${dados.id}/autores`);

                const autores = autoresResponse.data.dados.map(autor => ({
                    nome: autor.nome,
                    proponente: autor.proponente,
                    ordem_assinatura: autor.ordemAssinatura,
                    autoria_unica: autor.proponente === 1 && autor.ordemAssinatura === 1 ? true : false
                }));

                const resultado = {
                    proposicao_id: dados.id,
                    proposicao_titulo: `${dados.siglaTipo} ${dados.numero}/${dados.ano}`,
                    proposicao_ementa: dados.ementa,
                    proposicao_detalhes: {
                        data_apresentacao: dados.dataApresentacao,
                        arquivado: dados.statusProposicao.codSituacao === 923,
                        transformada_em_lei: dados.statusProposicao.codSituacao === 1140,
                        documento: dados.urlInteiroTeor
                    },
                    proposicao_autores: autores
                };

                if (!uri) {
                    return res.status(200).json({ status: 200, dados: resultado });
                }

            }
        } catch (error) {
            addLog('error_proposicoes', error.message);
            return res.status(500).json({ status: 500, message: 'Erro interno do servidor' });
        }
    }

    async BuscarApensadosDoGabinete(req, res) {
        const id = req.query.id;

        try {
            const response = await axios.get(`${process.env.URL_API_CAMARA}/proposicoes/${id}/relacionadas`);

            if (response.data.dados.length == 0) {
                return res.status(200).json({ status: 200, message: 'Nenhuma proposição encontrada.' });
            }

            const proposicoes = await Promise.all(
                response.data.dados
                    .filter(proposicao => proposicao.siglaTipo === 'PL')
                    .map(async (proposicao) => {

                        const detalhes = await axios.get(`${process.env.URL_API_CAMARA}/proposicoes/${proposicao.id}`);
                        const autoresResponse = await axios.get(`${process.env.URL_API_CAMARA}/proposicoes/${proposicao.id}/autores`);

                        const autores = autoresResponse.data.dados.map(autor => ({
                            nome: autor.nome,
                            proponente: autor.proponente,
                            ordem_assinatura: autor.ordemAssinatura,
                            autoria_unica: autor.proponente === 1 && autor.ordemAssinatura === 1 ? true : false
                        }));

                        const autorDeputado = autores.some(autor => autor.nome === process.env.NOME_PARLAMENTAR);

                        if (autorDeputado) {
                            return {
                                proposicao_principal: id,
                                apensado_id: proposicao.id,
                                apensado_titulo: `${proposicao.siglaTipo} ${proposicao.numero}/${proposicao.ano}`,
                                apensado_ementa: proposicao.ementa,
                                proposicao_detalhes: {
                                    data_apresentacao: detalhes.data.dados.dataApresentacao,
                                    arquivado: detalhes.data.dados.statusProposicao.codSituacao === 923,
                                    transformada_em_lei: detalhes.data.dados.statusProposicao.codSituacao === 1140,
                                    documento: detalhes.data.dados.urlInteiroTeor
                                },
                                apensado_autores: autores
                            };
                        }
                    })
            );

            const proposicoesFiltradas = proposicoes.filter(Boolean);

            if (proposicoesFiltradas.length == 0) {
                return res.status(200).json({ status: 200, message: 'Nenhuma proposição encontrada.' });
            }

            return res.status(200).json({ status: 200, dados: proposicoesFiltradas });
        } catch (error) {
            addLog('error_proposicoes', error.message);
            return res.status(500).json({ status: 500, message: 'Erro interno do servidor' });
        }
    }

    async BuscarAutores(req, res) {
        const id = Number(req.query.id);
        let response = '';
    
        try {
            response = await axios.get(`${process.env.URL_API_CAMARA}/proposicoes/${id}/autores`);
    
            if (response.data.dados.length === 0) {
                return res.status(200).json({ status: 200, message: 'Nenhum autor encontrado.' });
            }
    
            const autores = await Promise.all(
                response.data.dados.map(async (autor) => {
                    let siglaPartido = null;
                    let uriPartido = null;
                    let siglaUf = null;
    
                    if (autor.codTipo === 10000) {
                        const deputadoResponse = await axios.get(`${process.env.URL_API_CAMARA}/deputados?nome=${autor.nome}`);
                        if (deputadoResponse.data.dados.length > 0) {
                            const deputadoDados = deputadoResponse.data.dados[0];
                            siglaPartido = deputadoDados.siglaPartido;
                            uriPartido = deputadoDados.uriPartido;
                            siglaUf = deputadoDados.siglaUf;
                        }
                    }
    
                    return {
                        nome: autor.nome,
                        proponente: autor.proponente,
                        ordem_assinatura: autor.ordemAssinatura,
                        siglaPartido,
                        uriPartido,
                        siglaUf,
                    };
                })
            );
    
            return res.status(200).json({ status: 200, message: 'Autores encontrados', dados: autores });
        } catch (error) {
            addLog('error_proposicoes', error.message);
            return res.status(500).json({ status: 500, message: 'Erro interno do servidor' });
        }
    }
    
    




}

module.exports = new ProposicoesController();
