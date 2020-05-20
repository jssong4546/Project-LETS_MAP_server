'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('favorite_markets', 'userid', {
          type: 'integer',
          references: {
            model: 'users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }),
        queryInterface.addColumn('favorite_markets', 'marketid', {
          type: 'integer',
          references: {
            model: 'markets',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }),
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('favorite_markets', 'userid'),
        queryInterface.removeColumn('favorite_markets', 'marketid'),
      ]);
    });
    // return [
    //   queryInterface.removeColumn('favorite_markets', 'userid'),
    //   queryInterface.removeColumn('favorite_markets', 'marketid'),
    // ];
    // return queryInterface.removeColumn('favorite_markets', 'marketid');
  },
};
