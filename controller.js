const { users } = require('./models');
const axios = require('axios');

module.exports = {
  signInController: (req, res) => {
    const { email, password } = req.body;
    console.log('hello world');
    users
      .findOne({
        where: {
          email,
          password,
        },
      })
      .then((data) => {
        if (data) {
          req.session.userid = data.id;
          res.status(200).send(data);
        } else {
          res.status(404).send('Invalid User');
        }
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  },
  signUpController: (req, res) => {
    const { email } = req.body;

    users
      .findOne({ where: { email } })
      .then((data) => {
        if (data) {
          res.status(409).send('Email Exists');
        } else {
          users.create(req.body).then((data) => {
            res.status(201).send({
              id: data.id,
              username: data.username,
              email: data.email,
            });
          });
        }
      })
      .catch((err) => {
        res.status(409).send(err);
      });
  },
  logOutController: (req, res) => {
    const { email, password } = req.body;

    users
      .findOne({ where: { email, password } })
      .then((data) => {})
      .catch((err) => {
        res.status(404).send(err);
      });
  },
  findAddressController: (req, res) => {
    const { address } = req.body;

    axios.get('https://openapi.gg.go.kr/RegionMnyFacltStus');
  },
};
