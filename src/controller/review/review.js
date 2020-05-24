const { users, markets, comments } = require('../../db/models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  get: (req, res) => {
    /*
     * 마켓의 위치를 통해 조회하고 마켓 ,유저 , 리뷰를 함께 JOIN해서 보낸다
     */
    return res.sendStatus(200);
  },
  post: (req, res) => {
    /*
     * 마켓,유저,리뷰 정보를 DB에 저장한다
     */
    let { userid, market, text } = req.body;
    users
      .findOne({
        where: {
          userid,
        },
      })
      .then((userData) => {
        markets.findOrCreate;
        markets
          .findOrCreate({
            where: { logt: market.tt, lat: market.tt },
            defaults: {
              marketname: market.name,
              indutype: market.induType,
              telephone: market.telNo,
              address: market.address,
              logt: market.logt,
              lat: market.lat,
            },
          })
          .then(([marketData, created]) => {
            comments
              .create({
                text: text,
                userid: userData.id,
                marketid: marketData.id,
              })
              .then((data) => {
                return res.status(200).json({
                  comments: data,
                  code: 200,
                });
              });
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('server error');
      });
  },
};
