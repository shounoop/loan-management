'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('AdminActivityLog', {
            log_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            admin_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            activity_type: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            activity_desc: {
                type: Sequelize.TEXT,
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
        await queryInterface.dropTable('AdminActivityLog');
    }
};