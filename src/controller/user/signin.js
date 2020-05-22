const { users } = require('../../db/models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  post: (req, res) => {
    const { userid, password } = req.body;
    users
      .findOne({
        where: {
          userid,
          password,
        },
      })
      .then((data) => {
        if (data) {
          const token = jwt.sign(
            {
              id: data.id,
              userid: data.userid,
            },
            process.env.JWT_PASSWORD,
            {
              expiresIn: '1m',
            },
          );
          req.headers.authorization = token;
          return res.status(200).json({
            lcode: 200,
            message: 'jwt 발급',
            token: token,
          });
        } else {
          res.status(404).send('Invalid User');
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(404).send(err);
      });
  },
};
