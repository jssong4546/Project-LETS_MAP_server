const {
  users,
  markets,
  favorite_markets,
  comments,
} = require('../../db/models');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const indutypeFilter = require('../../util/indutypeChecker');
const getMarketAPI = require('../../util/getMarketAPI');

require('dotenv').config();
module.exports = {
  get: async (req, res) => {
    const { address, indutype } = req.body;
    let result = [];

    // * 경기도 api로 부터 도로명 주소 마켓 받아온다
    let roadNumber = await getMarketAPI.api('REFINE_ROADNM_ADDR', address);

    // * 도로명이 존재하면 지번주소 마켓은 생략한다
    if (roadNumber.length > 1) {
      // * 필터함수를 호출하여 필터링 된 값을 저장한다
      result = indutypeFilter.get(roadNumber, indutype);
    } else {
      let lotNumber = await getMarketAPI.api('REFINE_LOTNO_ADDR', address);
      result = indutypeFilter.get(lotNumber, indutype);
    }

    result = result.filter((ele) => ele !== undefined);
    if (result) {
      res.status(200).send({ addressList: result });
    } else {
      res.status(404).send('Not Found');
    }
  },
};
