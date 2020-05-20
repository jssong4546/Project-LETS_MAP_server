'use strict';
module.exports = (sequelize, DataTypes) => {
  const comments = sequelize.define(
    'comments',
    {
      text: DataTypes.STRING,
      userid: DataTypes.INTEGER,
      marketid: DataTypes.INTEGER,
    },
    {},
  );
  comments.associate = function (models) {
    // associations can be defined here
    let { users, markets } = models;
    comments.belongsTo(users);
    comments.belongsTo(markets);
  };
  return comments;
};
