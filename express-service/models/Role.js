'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Role.hasMany(models.UserRole, { foreignKey: 'role_id' });
        }
    };
    //object relational mapping
    Role.init({
        role_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        role_name: {
            type: DataTypes.STRING(50),
        },
        operation: {
            type: DataTypes.STRING(50),
        },
        permission: {
            type: DataTypes.STRING(50),
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        sequelize,
        timestamps: true,
        modelName: 'Role',
    });
    return Role;
};