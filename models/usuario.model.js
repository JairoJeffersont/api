const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/sequelize');

class Usuario extends Model { }

Usuario.init({
    usuario_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    usuario_nome: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    usuario_email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    usuario_telefone: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    usuario_aniversario: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    usuario_senha: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    usuario_nivel: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    usuario_ativo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    usuario_token: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    usuario_foto: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuarios',
    timestamps: true,
    createdAt: 'usuario_criado_em',
    updatedAt: 'usuario_atualizado_em',
});

module.exports = Usuario;
