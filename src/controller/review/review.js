const { users, markets, comments } = require('../../db/models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  get: (req, res) => {
    /*
     * 마켓의 위치를 통해 조회하고 마켓 ,유저 , 리뷰를 함께 JOIN해서 보낸다
     */
    let { logt, lat } = req.body;
    comments
      .findAll({
        include: [
          {
            model: markets,
            attributes: ['marketname', 'logt', 'lat'],
            where: {
              logt,
              lat,
            },
          },
          {
            model: users,
            attributes: ['userid'],
          },
        ],
        where: {},
      })
      .then((data) => {
        let result = [];
        for (let i = 0; i < data.length; i++) {
          result.push({
            marketname: data[i].market.marketname,
            userid: data[i].user.userid,
            text: data[i].text,
          });
        }
        return res.status(200).json({
          reviews: result,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send('server error');
      });
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
            where: { logt: market.logt, lat: market.lat },
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
  delete: (req, res) => {
    let { id } = req.body;
    comments
      .destroy({
        where: {
          id,
        },
      })
      .then((affectedRows) => {
        if (affectedRows) {
          res.status(200).send(`${affectedRows}개의 댓글이 삭제되었습니다`);
        } else {
          res.status(204).send(`찾으시는 댓글이 존재하지 않습니다.`);
        }
      })
      .catch((err) => {
        res.status(500).send('server error');
      });
  },
  put: (req, res) => {
    let { id, text } = req.body;
    comments
      .update({ text: text }, { where: { id: id } })
      .then((rowsUpdated) => {
        if (rowsUpdated) {
          res.status(200).send(`${rowsUpdated}개의 댓글이 업데이트 되었습니다`);
        } else {
          res.status(204).send(`찾으시는 댓글이 존재하지 않습니다.`);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('server error');
      });
  },
};
