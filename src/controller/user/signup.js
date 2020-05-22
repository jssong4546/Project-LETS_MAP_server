const { users } = require('../../db/models');

module.exports = {
  post: (req, res) => {
    const { userid } = req.body;
    console.log('Enter signUpController');
    users
      .findOne({ where: { userid } })
      .then((data) => {
        if (data) {
          res.status(409).send('User Id Exists');
        } else {
          users.create(req.body).then((data) => {
            res.status(201).send({
              id: data.id,
              userid: data.userid,
            });
          });
        }
      })
      .catch((err) => {
        res.status(409).send(err);
      });
  },
};
