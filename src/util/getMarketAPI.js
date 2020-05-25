const axios = require('axios');
require('dotenv').config();

module.exports = {
  api: async (info, address) => {
    let result = [];
    let totalCount = 0;
    result = result.concat(
      await axios
        .get(
          `https://openapi.gg.go.kr/RegionMnyFacltStus?Type=json&KEY=${
            process.env.KEY
          }&${info}=${encodeURI(address)}&pSize=1000&pIndex=1`,
        )
        .then((val) => {
          if (val.data['RegionMnyFacltStus']) {
            totalCount =
              val.data['RegionMnyFacltStus'][0]['head'][0]['list_total_count'];
            return val.data['RegionMnyFacltStus'][1]['row'];
          } else {
            return null;
          }
        }),
    );
    for (let i = 2; i < Math.ceil(totalCount / 1000) + 1; i++) {
      result = result.concat(
        await axios
          .get(
            `https://openapi.gg.go.kr/RegionMnyFacltStus?Type=json&KEY=${
              process.env.KEY
            }&${info}=${encodeURI(address)}&pSize=1000&pIndex=${i}`,
          )
          .then((val) => {
            if (val.data['RegionMnyFacltStus']) {
              totalCount =
                val.data['RegionMnyFacltStus'][0]['head'][0][
                  'list_total_count'
                ];
              return val.data['RegionMnyFacltStus'][1]['row'];
            } else {
              return null;
            }
          }),
      );
    }
    return result;
  },
};
