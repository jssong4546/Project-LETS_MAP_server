const {
  users,
  markets,
  favorite_markets,
  comments,
} = require('../../db/models');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const indutypeFilter = require('../../util/indutypeChecker');

require('dotenv').config();
module.exports = {
  get: async (req, res) => {
    const { address, indutype } = req.body;
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

    let marketList = roadNumber || lotNumber;

    let result = indutypeFilter.get(marketList, indutype);
    result = result.filter((ele) => ele !== undefined);
    console.dir(result);
    if (result) {
      res.status(200).send({ addressList: result });
    } else {
      res.status(404).send('Not Found');
    }
  },
};
