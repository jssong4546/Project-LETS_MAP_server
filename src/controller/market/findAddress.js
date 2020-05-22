const {
  users,
  markets,
  favorite_markets,
  comments,
} = require('../../db/models');
const axios = require('axios');
const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports = {
  get: async (req, res) => {
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
