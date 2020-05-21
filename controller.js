const { users, markets, favorite_markets, comments } = require('./models');
const axios = require('axios');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  signInController: (req, res) => {
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
          return res.cookie('w_auth', token).status(200).json({
            lcode: 200,
            message: 'jwt 발급',
          });
        } else {
          res.status(404).send('Invalid User');
        }
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  },
  signUpController: (req, res) => {
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
  logOutController: (req, res) => {
    delete req.cookies.w_auth;
    res.status(200).send('Log Out');
  },
  findAddressController: async (req, res) => {
    const { address } = req.body;
    let result = [];
    //도로명주소
    let roadNumber = await axios
      .get(
        `https://openapi.gg.go.kr/RegionMnyFacltStus?Type=json&KEY=${
          process.env.KEY
        }&REFINE_ROADNM_ADDR=${encodeURI(address)}`,
      )
      .then((val) => {
        if (val.data['RegionMnyFacltStus']) {
          return val.data['RegionMnyFacltStus'][1]['row'];
        } else {
          return null;
        }
      });
    //지번주소
    let lotNumber = await axios
      .get(
        `https://openapi.gg.go.kr/RegionMnyFacltStus?Type=json&KEY=${
          process.env.KEY
        }&REFINE_LOTNO_ADDR=${encodeURI(address)}`,
      )
      .then((val) => {
        if (val.data['RegionMnyFacltStus']) {
          return val.data['RegionMnyFacltStus'][1]['row'];
        } else {
          return null;
        }
      });
    //상호명
    let tradeName = await axios
      .get(
        `https://openapi.gg.go.kr/RegionMnyFacltStus?Type=json&KEY=${
          process.env.KEY
        }&CMPNM_NM=${encodeURI(address)}`,
      )
      .then((val) => {
        if (val.data['RegionMnyFacltStus']) {
          return val.data['RegionMnyFacltStus'][1]['row'];
        } else {
          return null;
        }
      });
    console.log(tradeName);
    if (roadNumber) {
      result = result.concat(roadNumber, tradeName);
    } else if (lotNumber) {
      result = result.concat(lotNumber, tradeName);
    } else {
      result = result.concat(tradeName);
    }
    if (result) {
      res.status(200).send({ addressList: result });
    } else {
      res.status(404).send('Not Found');
    }
  },
};
