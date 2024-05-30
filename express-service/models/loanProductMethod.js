'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class LoanProductMethod extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            LoanProductMethod.belongsTo(models.LoanProduct, { foreignKey: 'loan_product_id' });
            LoanProductMethod.belongsTo(models.LoanMethod, { foreignKey: 'loan_method_id' });
        }
    };
    //object relational mapping
    LoanProductMethod.init({
        loan_product_id: {
            type: DataTypes.INTEGER,
        },
        loan_method_id: {
            type: DataTypes.INTEGER,
        },
    }, {
        sequelize,
        modelName: 'LoanProductMethod',
    });
    return LoanProductMethod;
};