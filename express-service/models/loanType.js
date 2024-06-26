'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class LoanType extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            LoanType.hasMany(models.LoanProduct, { foreignKey: 'loan_type_id' });
        }
    };
    //object relational mapping
    LoanType.init({
        loan_type_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        loan_type_name: {
            type: DataTypes.STRING(50),
        },
        loan_type_desc: {
            type: DataTypes.STRING(255),
        },
        interest_rate: {
            type: DataTypes.DECIMAL(5, 2)
        },
        late_interest_fee: {
            type: DataTypes.DECIMAL(15, 2)
        },
        prepay_interest_fee: {
            type: DataTypes.DECIMAL(15, 2)
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

        modelName: 'LoanType',
    });
    return LoanType;
};