const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Usuario = require('../models/usuario.model');
const { Orgao } = require('../models/orgao.model');

class Pessoa extends Model { }

Pessoa.init({
    pessoa_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    pessoa_nome: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    pessoa_email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    pessoa_aniversario: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    pessoa_sexo: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    pessoa_instagram: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    pessoa_facebook: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    pessoa_twitter: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    pessoa_telefone: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    pessoa_endereco: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    pessoa_bairro: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    pessoa_municipio: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    pessoa_estado: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    pessoa_cep: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    pessoa_informacoes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    pessoa_cargo: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    pessoa_partido: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    pessoa_profissao: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    pessoa_foto: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    pessoa_tipo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    pessoa_orgao: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    pessoa_criada_por: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    pessoa_criado_em: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    pessoa_atualizado_em: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW,
    },
    pessoa_foto: {
        type: DataTypes.TEXT('long'),
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'Pessoa',
    tableName: 'pessoas',
    timestamps: true,
    createdAt: 'pessoa_criado_em',
    updatedAt: 'pessoa_atualizado_em',
});

class TipoPessoa extends Model { }

TipoPessoa.init({
    tipo_pessoa_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    tipo_pessoa_nome: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    tipo_pessoa_descricao: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    tipo_pessoa_criado_em: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    modelName: 'TipoPessoa',
    tableName: 'tipos_pessoas',
    timestamps: false,
});


Pessoa.belongsTo(TipoPessoa, {
    foreignKey: 'pessoa_tipo',
    targetKey: 'tipo_pessoa_id',
    onDelete: 'RESTRICT',
    onUpdate: 'NO ACTION'
});
TipoPessoa.hasMany(Pessoa, {
    foreignKey: 'pessoa_tipo',
    onDelete: 'RESTRICT',
    onUpdate: 'NO ACTION'
});

Pessoa.belongsTo(Orgao, {
    foreignKey: 'pessoa_orgao',
    targetKey: 'orgao_id',
    onDelete: 'RESTRICT',
    onUpdate: 'NO ACTION'
});
Orgao.hasMany(Pessoa, {
    foreignKey: 'pessoa_orgao',
    onDelete: 'RESTRICT',
    onUpdate: 'NO ACTION'
});

Pessoa.belongsTo(Usuario, {
    foreignKey: 'pessoa_criada_por',
    targetKey: 'usuario_id',
    onDelete: 'RESTRICT',
    onUpdate: 'NO ACTION'
});
Usuario.hasMany(Pessoa, {
    foreignKey: 'pessoa_criada_por',
    onDelete: 'RESTRICT',
    onUpdate: 'NO ACTION'
});

module.exports = { Pessoa, TipoPessoa, Usuario, Orgao };
