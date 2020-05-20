'use strict';
module.exports = (sequelize, DataTypes) => {
  const favorite_markets = sequelize.define(
    'favorite_markets',
    {
      userid: DataTypes.INTEGER,
      marketid: DataTypes.INTEGER,
    },
    {},
  );
  favorite_markets.associate = function (models) {
    // associations can be defined here
    let { users, markets } = models;

    favorite_markets.belongsTo(users);
    favorite_markets.belongsTo(markets);
  };
  return favorite_markets;
};
