'use strict';
module.exports = (sequelize, DataTypes) => {
  const comments = sequelize.define(
    'comments',
    {
      text: DataTypes.STRING,
    },
    {},
  );
  comments.associate = function (models) {
    // associations can be defined here
    let { users, markets } = models;
    comments.belongsTo(users, {
      foreignKey: 'userid',
    });
    comments.belongsTo(markets, {
      foreignKey: 'marketid',
    });
  };
  return comments;
};
