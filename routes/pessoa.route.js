const express = require('express');
const router = express.Router();
const PessoaController = require('../controllers/pessoa.controller');

router.get('/pessoas-sync', PessoaController.syncModel);

/**
 * @swagger
 * /api/pessoas:
 *   post:
 *     summary: Cria uma nova pessoa.
 *     tags:
 *       - Pessoas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pessoa_nome:
 *                 type: string
 *                 description: Nome da pessoa (obrigatório)
 *                 example: João da Silva
 *               pessoa_email:
 *                 type: string
 *                 description: Email da pessoa (obrigatório)
 *                 example: joao.silva@example.com
 *               pessoa_aniversario:
 *                 type: string
 *                 format: date-time
 *                 description: Aniversário da pessoa
 *                 example: 1985-10-23T00:00:00Z
 *               pessoa_sexo:
 *                 type: string
 *                 description: Sexo da pessoa
 *                 example: Masculino
 *               pessoa_instagram:
 *                 type: string
 *                 description: Instagram da pessoa
 *                 example: joaosilva
 *               pessoa_facebook:
 *                 type: string
 *                 description: Facebook da pessoa
 *                 example: facebook.com/joaosilva
 *               pessoa_twitter:
 *                 type: string
 *                 description: Twitter da pessoa
 *                 example: joaosilva
 *               pessoa_telefone:
 *                 type: string
 *                 description: Telefone da pessoa (obrigatório)
 *                 example: +55 11 91234-5678
 *               pessoa_endereco:
 *                 type: string
 *                 description: Endereço da pessoa
 *                 example: Rua das Flores, 123
 *               pessoa_bairro:
 *                 type: string
 *                 description: Bairro da pessoa
 *                 example: Centro
 *               pessoa_municipio:
 *                 type: string
 *                 description: Município da pessoa (obrigatório)
 *                 example: São Paulo
 *               pessoa_estado:
 *                 type: string
 *                 description: Estado da pessoa (obrigatório)
 *                 example: SP
 *               pessoa_cep:
 *                 type: string
 *                 description: CEP da pessoa
 *                 example: 01234-567
 *               pessoa_informacoes:
 *                 type: string
 *                 description: Outras informações sobre a pessoa
 *                 example: Informações adicionais
 *               pessoa_cargo:
 *                 type: string
 *                 description: Cargo da pessoa
 *                 example: Diretor
 *               pessoa_partido:
 *                 type: string
 *                 description: Partido da pessoa
 *                 example: Partido X
 *               pessoa_profissao:
 *                 type: string
 *                 description: Profissão da pessoa
 *                 example: Engenheiro
 *               pessoa_tipo:
 *                 type: integer
 *                 description: Tipo de pessoa (obrigatório)
 *                 example: 1
 *               pessoa_orgao:
 *                 type: integer
 *                 description: Órgão ao qual a pessoa pertence (obrigatório)
 *                 example: 1
 *     responses:
 *       201:
 *         description: Pessoa criada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: Pessoa criada com sucesso.
 *       400:
 *         description: Todos os campos obrigatórios devem ser preenchidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Todos os campos são obrigatórios.
 *       409:
 *         description: Conflito devido a dados já existentes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 409
 *                 message:
 *                   type: string
 *                   example: Esse usuário já está cadastrado.
 *       500:
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Erro interno do servidor.
 */
router.post('/pessoas', PessoaController.create);

/**
 * @swagger
 * /api/pessoas/{id}:
 *   put:
 *     summary: Atualiza uma pessoa existente. O parâmetro `id` é obrigatório.
 *     tags:
 *       - Pessoas
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da pessoa a ser atualizada
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pessoa_nome:
 *                 type: string
 *                 description: Nome da pessoa
 *                 example: João da Silva
 *               pessoa_email:
 *                 type: string
 *                 description: Email da pessoa
 *                 example: joao.silva@example.com
 *               pessoa_aniversario:
 *                 type: string
 *                 format: date-time
 *                 description: Aniversário da pessoa
 *                 example: 1985-10-23T00:00:00Z
 *               pessoa_sexo:
 *                 type: string
 *                 description: Sexo da pessoa
 *                 example: Masculino
 *               pessoa_instagram:
 *                 type: string
 *                 description: Instagram da pessoa
 *                 example: joaosilva
 *               pessoa_facebook:
 *                 type: string
 *                 description: Facebook da pessoa
 *                 example: facebook.com/joaosilva
 *               pessoa_twitter:
 *                 type: string
 *                 description: Twitter da pessoa
 *                 example: joaosilva
 *               pessoa_telefone:
 *                 type: string
 *                 description: Telefone da pessoa
 *                 example: +55 11 91234-5678
 *               pessoa_endereco:
 *                 type: string
 *                 description: Endereço da pessoa
 *                 example: Rua das Flores, 123
 *               pessoa_bairro:
 *                 type: string
 *                 description: Bairro da pessoa
 *                 example: Centro
 *               pessoa_municipio:
 *                 type: string
 *                 description: Município da pessoa
 *                 example: São Paulo
 *               pessoa_estado:
 *                 type: string
 *                 description: Estado da pessoa
 *                 example: SP
 *               pessoa_cep:
 *                 type: string
 *                 description: CEP da pessoa
 *                 example: 01234-567
 *               pessoa_informacoes:
 *                 type: string
 *                 description: Outras informações sobre a pessoa
 *                 example: Informações adicionais
 *               pessoa_cargo:
 *                 type: string
 *                 description: Cargo da pessoa
 *                 example: Diretor
 *               pessoa_partido:
 *                 type: string
 *                 description: Partido da pessoa
 *                 example: Partido X
 *               pessoa_profissao:
 *                 type: string
 *                 description: Profissão da pessoa
 *                 example: Engenheiro
 *               pessoa_tipo:
 *                 type: integer
 *                 description: Tipo de pessoa
 *                 example: 1
 *               pessoa_orgao:
 *                 type: integer
 *                 description: Órgão ao qual a pessoa pertence
 *                 example: 2
 *               pessoa_criada_por:
 *                 type: integer
 *                 description: ID do usuário que criou a pessoa
 *                 example: 3
 *     responses:
 *       200:
 *         description: Pessoa atualizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Pessoa atualizada com sucesso.
 *       400:
 *         description: ID do usuário não enviado ou inválido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: ID do usuário não enviado ou inválido.
 *       404:
 *         description: Pessoa não encontrada ou nenhum dado atualizado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: Pessoa não encontrada ou nenhum dado atualizado.
 *       500:
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Erro interno do servidor.
 */
router.put('/pessoas/:id', PessoaController.update);

/**
 * @swagger
 * /api/pessoas:
 *   get:
 *     summary: Lista as pessoas com paginação e ordenação.
 *     tags:
 *       - Pessoas
 *     parameters:
 *       - name: pagina
 *         in: query
 *         description: Número da página para paginação
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: itens
 *         in: query
 *         description: Número de itens por página
 *         schema:
 *           type: integer
 *           default: 10
 *       - name: ordem
 *         in: query
 *         description: Ordem de classificação (ASC ou DESC)
 *         schema:
 *           type: string
 *           default: ASC
 *       - name: ordernarPor
 *         in: query
 *         description: Campo pelo qual ordenar
 *         schema:
 *           type: string
 *           default: pessoa_nome
 *     responses:
 *       200:
 *         description: Lista de pessoas encontrada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: 5 pessoa(s) encontrada(s)
 *                 dados:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       pessoa_id:
 *                         type: integer
 *                         example: 1
 *                       pessoa_nome:
 *                         type: string
 *                         example: João da Silva
 *                       pessoa_email:
 *                         type: string
 *                         example: joao.silva@example.com
 *                       pessoa_aniversario:
 *                         type: string
 *                         format: date-time
 *                         example: 1985-10-23T00:00:00Z
 *                       pessoa_sexo:
 *                         type: string
 *                         example: Masculino
 *                       pessoa_instagram:
 *                         type: string
 *                         example: joaosilva
 *                       pessoa_facebook:
 *                         type: string
 *                         example: facebook.com/joaosilva
 *                       pessoa_twitter:
 *                         type: string
 *                         example: joaosilva
 *                       pessoa_telefone:
 *                         type: string
 *                         example: +55 11 91234-5678
 *                       pessoa_endereco:
 *                         type: string
 *                         example: Rua das Flores, 123
 *                       pessoa_bairro:
 *                         type: string
 *                         example: Centro
 *                       pessoa_municipio:
 *                         type: string
 *                         example: São Paulo
 *                       pessoa_estado:
 *                         type: string
 *                         example: SP
 *                       pessoa_cep:
 *                         type: string
 *                         example: 01234-567
 *                       pessoa_informacoes:
 *                         type: string
 *                         example: Informações adicionais
 *                       pessoa_cargo:
 *                         type: string
 *                         example: Diretor
 *                       pessoa_partido:
 *                         type: string
 *                         example: Partido X
 *                       pessoa_profissao:
 *                         type: string
 *                         example: Engenheiro
 *                       pessoa_tipo:
 *                         type: integer
 *                         example: 1
 *                       pessoa_orgao:
 *                         type: integer
 *                         example: 2
 *                       pessoa_criada_por:
 *                         type: integer
 *                         example: 3
 *                       pessoa_criado_em:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-08-14T00:00:00Z
 *                       pessoa_atualizado_em:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-08-14T00:00:00Z
 *                 links:
 *                   type: object
 *                   properties:
 *                     first:
 *                       type: string
 *                       example: /api/pessoas?itens=10&pagina=1&ordem=ASC&ordernarPor=pessoa_nome
 *                     self:
 *                       type: string
 *                       example: /api/pessoas?itens=10&pagina=2&ordem=ASC&ordernarPor=pessoa_nome
 *                     last:
 *                       type: string
 *                       example: /api/pessoas?itens=10&pagina=3&ordem=ASC&ordernarPor=pessoa_nome
 *       400:
 *         description: Parâmetro 'ordenarPor' inválido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Parâmetro 'ordenarPor' inválido.
 *       500:
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Erro interno do servidor.
 */
router.get('/pessoas', PessoaController.list);

/**
 * @swagger
 * /api/pessoas/{id}:
 *   get:
 *     summary: Encontra uma pessoa pelo ID. O parâmetro `id` é obrigatório.
 *     tags:
 *       - Pessoas
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da pessoa a ser encontrada
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Pessoa encontrada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Pessoa encontrada.
 *                 dados:
 *                   type: object
 *                   properties:
 *                     pessoa_id:
 *                       type: integer
 *                       example: 1
 *                     pessoa_nome:
 *                       type: string
 *                       example: João da Silva
 *                     pessoa_email:
 *                       type: string
 *                       example: joao.silva@example.com
 *                     pessoa_aniversario:
 *                       type: string
 *                       format: date-time
 *                       example: 1985-10-23T00:00:00Z
 *                     pessoa_sexo:
 *                       type: string
 *                       example: Masculino
 *                     pessoa_instagram:
 *                       type: string
 *                       example: joaosilva
 *                     pessoa_facebook:
 *                       type: string
 *                       example: facebook.com/joaosilva
 *                     pessoa_twitter:
 *                       type: string
 *                       example: joaosilva
 *                     pessoa_telefone:
 *                       type: string
 *                       example: +55 11 91234-5678
 *                     pessoa_endereco:
 *                       type: string
 *                       example: Rua das Flores, 123
 *                     pessoa_bairro:
 *                       type: string
 *                       example: Centro
 *                     pessoa_municipio:
 *                       type: string
 *                       example: São Paulo
 *                     pessoa_estado:
 *                       type: string
 *                       example: SP
 *                     pessoa_cep:
 *                       type: string
 *                       example: 01234-567
 *                     pessoa_informacoes:
 *                       type: string
 *                       example: Informações adicionais
 *                     pessoa_cargo:
 *                       type: string
 *                       example: Diretor
 *                     pessoa_partido:
 *                       type: string
 *                       example: Partido X
 *                     pessoa_profissao:
 *                       type: string
 *                       example: Engenheiro
 *                     pessoa_tipo:
 *                       type: integer
 *                       example: 1
 *                     pessoa_orgao:
 *                       type: integer
 *                       example: 2
 *                     pessoa_criada_por:
 *                       type: integer
 *                       example: 3
 *                     pessoa_criado_em:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-08-14T00:00:00Z
 *                     pessoa_atualizado_em:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-08-14T00:00:00Z
 *       204:
 *         description: Pessoa não encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 204
 *                 message:
 *                   type: string
 *                   example: Pessoa não encontrada.
 *       400:
 *         description: ID da pessoa não enviado ou inválido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: ID da pessoa não enviado ou inválido.
 *       500:
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Erro interno do servidor.
 */
router.get('/pessoas/:id', PessoaController.find);

/**
 * @swagger
 * /api/pessoasBusca:
 *   get:
 *     summary: Busca pessoas com base no nome e permite paginação e ordenação.
 *     tags:
 *       - Pessoas
 *     parameters:
 *       - name: pagina
 *         in: query
 *         description: Número da página para paginação
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: itens
 *         in: query
 *         description: Número de itens por página
 *         schema:
 *           type: integer
 *           default: 10
 *       - name: ordem
 *         in: query
 *         description: Ordem de classificação (ASC ou DESC)
 *         schema:
 *           type: string
 *           default: ASC
 *       - name: ordernarPor
 *         in: query
 *         description: Campo pelo qual ordenar
 *         schema:
 *           type: string
 *           default: pessoa_nome
 *       - name: nome
 *         in: query
 *         description: Nome da pessoa para busca
 *         schema:
 *           type: string
 *           example: João
 *     responses:
 *       200:
 *         description: Pessoas encontradas com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: 5 pessoa(s) encontrada(s)
 *                 dados:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       pessoa_id:
 *                         type: integer
 *                         example: 1
 *                       pessoa_nome:
 *                         type: string
 *                         example: João da Silva
 *                       pessoa_email:
 *                         type: string
 *                         example: joao.silva@example.com
 *                       pessoa_aniversario:
 *                         type: string
 *                         format: date-time
 *                         example: 1985-10-23T00:00:00Z
 *                       pessoa_sexo:
 *                         type: string
 *                         example: Masculino
 *                       pessoa_instagram:
 *                         type: string
 *                         example: joaosilva
 *                       pessoa_facebook:
 *                         type: string
 *                         example: facebook.com/joaosilva
 *                       pessoa_twitter:
 *                         type: string
 *                         example: joaosilva
 *                       pessoa_telefone:
 *                         type: string
 *                         example: +55 11 91234-5678
 *                       pessoa_endereco:
 *                         type: string
 *                         example: Rua das Flores, 123
 *                       pessoa_bairro:
 *                         type: string
 *                         example: Centro
 *                       pessoa_municipio:
 *                         type: string
 *                         example: São Paulo
 *                       pessoa_estado:
 *                         type: string
 *                         example: SP
 *                       pessoa_cep:
 *                         type: string
 *                         example: 01234-567
 *                       pessoa_informacoes:
 *                         type: string
 *                         example: Informações adicionais
 *                       pessoa_cargo:
 *                         type: string
 *                         example: Diretor
 *                       pessoa_partido:
 *                         type: string
 *                         example: Partido X
 *                       pessoa_profissao:
 *                         type: string
 *                         example: Engenheiro
 *                       pessoa_tipo:
 *                         type: integer
 *                         example: 1
 *                       pessoa_orgao:
 *                         type: integer
 *                         example: 2
 *                       pessoa_criada_por:
 *                         type: integer
 *                         example: 3
 *                       pessoa_criado_em:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-08-14T00:00:00Z
 *                       pessoa_atualizado_em:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-08-14T00:00:00Z
 *                 links:
 *                   type: object
 *                   properties:
 *                     first:
 *                       type: string
 *                       example: /api/pessoas/busca?itens=10&pagina=1&ordem=ASC&ordernarPor=pessoa_nome&nome=João
 *                     self:
 *                       type: string
 *                       example: /api/pessoas/busca?itens=10&pagina=2&ordem=ASC&ordernarPor=pessoa_nome&nome=João
 *                     last:
 *                       type: string
 *                       example: /api/pessoas/busca?itens=10&pagina=3&ordem=ASC&ordernarPor=pessoa_nome&nome=João
 *       204:
 *         description: Nenhuma pessoa encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 204
 *                 message:
 *                   type: string
 *                   example: Nenhuma pessoa registrada.
 *       400:
 *         description: Parâmetro 'ordenarPor' inválido ou ID da pessoa não enviado ou inválido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Parâmetro 'ordenarPor' inválido ou ID da pessoa não enviado ou inválido.
 *       500:
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Erro interno do servidor.
 */
router.get('/pessoaBusca', PessoaController.search);

/**
 * @swagger
 * /api/pessoas/{id}:
 *   delete:
 *     summary: Remove uma pessoa pelo ID. O parâmetro `id` é obrigatório.
 *     tags:
 *       - Pessoas
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da pessoa a ser excluída
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Pessoa removida com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Pessoa apagada com sucesso.
 *       204:
 *         description: Pessoa não encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 204
 *                 message:
 *                   type: string
 *                   example: Pessoa não encontrada.
 *       400:
 *         description: ID da pessoa não enviado ou inválido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: ID da pessoa não enviado ou inválido.
 *       409:
 *         description: Conflito ao tentar excluir pessoa referenciada em outras tabelas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 409
 *                 message:
 *                   type: string
 *                   example: Não é possível apagar essa pessoa porque ela está referenciada em outras tabelas.
 *       500:
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Erro interno do servidor.
 */
router.delete('/pessoas/:id', PessoaController.delete);
module.exports = router;