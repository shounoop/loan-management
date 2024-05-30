'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('LoanProductType', {
            loan_product_type_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            loan_type_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            loan_product_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('LoanProductType');
    }
};