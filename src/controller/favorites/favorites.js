const { users, markets, favorite_markets } = require('../../db/models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  get: (req, res) => {
    /*
     * 유저의 id를 통해 즐겨찾기를 조회하고 마켓의 정보를 제공한다
     */
    let { userid } = req.body;
    favorite_markets
      .findAll({
        include: [
          {
            model: markets,
            attributes: ['marketname', 'logt', 'lat'],
          },
          {
            model: users,
            attributes: ['userid'],
            where: {
              userid: userid,
            },
          },
        ],
        where: {},
      })
      .then((data) => {
        let result = {
          userid: data[0].user.userid,
        };
        let marketlist = [];
        for (let i = 0; i < data.length; i++) {
          marketlist.push({
            marketname: data[i].market.marketname,
            indutype: data[i].market.indutype,
            telephone: data[i].market.telephone,
            address: data[i].market.address,
            logt: data[i].market.logt,
            lat: data[i].market.lat,
          });
        }
        result['marketlist'] = marketlist;
        return res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send('server error');
      });
  },
  post: (req, res) => {
    /*
     * 마켓,유저 정보를 이용해서 favorite_markets에 저장한다. DB에 저장한다
     */
    let { userid, market } = req.body;
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
            favorite_markets
              .findOrCreate({
                where: {
                  userid: userData.id,
                  marketid: marketData.id,
                },
              })
              .then(([data, created]) => {
                if (created) {
                  return res.status(200).json({
                    favorites: data,
                    code: 200,
                  });
                } else {
                  return res.status(409).send('이미 추가된 마켓입니다.');
                }
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
