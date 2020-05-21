'use strict';
module.exports = (sequelize, DataTypes) => {
  const favorite_markets = sequelize.define('favorite_markets', {}, {});
  favorite_markets.associate = function (models) {
    // associations can be defined here
    let { users, markets } = models;

    favorite_markets.belongsTo(users, {
      foreignKey: 'userid',
    });
    favorite_markets.belongsTo(markets, {
      foreignKey: 'marketid',
    });
  };
  return favorite_markets;
};
