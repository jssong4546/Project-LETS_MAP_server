'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      userid: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {},
  );
  users.associate = function (models) {
    // associations can be defined here
    let { favorite_markets, comments } = models;
    users.hasMany(favorite_markets, {
      foreignKey: 'userid',
    });
    users.hasMany(comments, {
      foreignKey: 'marketid',
    });
  };
  return users;
};
