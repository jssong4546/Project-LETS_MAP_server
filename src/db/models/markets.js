'use strict';
module.exports = (sequelize, DataTypes) => {
  const markets = sequelize.define(
    'markets',
    {
      marketname: DataTypes.STRING,
      indutype: DataTypes.STRING,
      telephone: DataTypes.STRING,
      address: DataTypes.STRING,
      logt: DataTypes.STRING,
      lat: DataTypes.STRING,
    },
    {},
  );
  markets.associate = function (models) {
    // associations can be defined here
    let { favorite_markets, comments } = models;
    markets.hasMany(favorite_markets, {
      foreignKey: 'userid',
    });
    markets.hasMany(comments, {
      foreignKey: 'marketid',
    });
  };
  return markets;
};
