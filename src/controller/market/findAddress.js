const getMarketAPI = require('../../util/getMarketAPI');
module.exports = {
  get: async (req, res) => {
    const { address } = req.body;
    let result = [];

    // * 경기도 api로 부터 도로명 주소 마켓 받아온다
    let roadNumber = await getMarketAPI.api('REFINE_ROADNM_ADDR', address);

    // * 도로명이 존재하면 지번주소 마켓은 생략한다
    if (roadNumber.length > 1) {
      result = roadNumber;
    } else {
      let lotNumber = await getMarketAPI.api('REFINE_LOTNO_ADDR', address);
      result = lotNumber;
    }

    // * 경기도 api로 부터 상호명 주소 마켓 받아온다
    let tradeName = await getMarketAPI.api('CMPNM_NM', address);

    // * 상호명 마켓과 주소 마켓을 합치고 클라이언트로 응답을 보낸다
    result = result.concat(tradeName);
    if (result) {
      console.log(req.body);
      res.status(200).send({ addressList: result });
    } else {
      res.status(404).send('Not Found');
    }
    return;
  },
};
