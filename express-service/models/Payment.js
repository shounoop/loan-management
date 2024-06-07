'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Payment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Payment.belongsTo(models.LoanProduct, { foreignKey: 'loan_product_id' });
            Payment.belongsTo(models.Customer, { foreignKey: 'customer_id' });
            Payment.hasMany(models.Document, { foreignKey: 'document_host_id' });
        }
    };
    //object relational mapping
    Payment.init({
        payment_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        loan_product_id: {
            type: DataTypes.INTEGER,
        },
        customer_id: {
            type: DataTypes.INTEGER,
        },
        payment_date: {
            type: DataTypes.DATE,
        },
        amount_all: {
            type: DataTypes.DECIMAL(18, 2),
        },
        amount_paid: {
            type: DataTypes.DECIMAL(18, 2),
        },
        remaining_balance: {
            type: DataTypes.DECIMAL(18, 2),
        },
        status: {
            type: DataTypes.STRING(50),
        },
    }, {
        sequelize,
        timestamps: true,

        modelName: 'Payment',
    });
    return Payment;
};