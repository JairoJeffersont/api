const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Usuario = require('../models/usuario.model');

class Orgao extends Model { }

Orgao.init({
    orgao_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    orgao_nome: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    orgao_email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    orgao_telefone: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    orgao_cep: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    orgao_endereco: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    orgao_bairro: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    orgao_municipio: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    orgao_estado: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    orgao_site: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    orgao_instagram: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    orgao_facebook: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    orgao_informacoes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    orgao_tipo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    orgao_criado_em: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    orgao_atualizado_em: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW,
    },
    orgao_criado_por: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Orgao',
    tableName: 'orgaos',
    timestamps: true,
    createdAt: 'orgao_criado_em',
    updatedAt: 'orgao_atualizado_em',
});

class TipoOrgao extends Model { }

TipoOrgao.init({
    orgao_tipo_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    orgao_tipo_nome: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    orgao_tipo_descricao: {
        type: DataTypes.STRING(1000),
        allowNull: true,
    },
    orgao_tipo_criado_em: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    modelName: 'TipoOrgao',
    tableName: 'tipos_orgaos',
    timestamps: false,
});

Orgao.belongsTo(TipoOrgao, {
    foreignKey: 'orgao_tipo',
    targetKey: 'orgao_tipo_id',
    onDelete: 'RESTRICT',
    onUpdate: 'NO ACTION'
});
TipoOrgao.hasMany(Orgao, {
    foreignKey: 'orgao_tipo',
    onDelete: 'RESTRICT',
    onUpdate: 'NO ACTION'
});

Orgao.belongsTo(Usuario, {
    foreignKey: 'orgao_criado_por',
    targetKey: 'usuario_id',
    onDelete: 'RESTRICT',
    onUpdate: 'NO ACTION'
});
Usuario.hasMany(Orgao, {
    foreignKey: 'orgao_criado_por',
    onDelete: 'RESTRICT',
    onUpdate: 'NO ACTION'
});

module.exports = { Orgao, TipoOrgao, Usuario };
