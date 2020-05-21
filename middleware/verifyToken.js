const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.verifyToken = (req, res, next) => {
  console.dir(req.headers.authorization);
  let token = req.cookies.w_auth;
  try {
    req.decoded = jwt.verify(token, process.env.JWT_PASSWORD);
    console.log(req.decoded);
    return next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(419).send('토큰이 만료되었습니다.');
    }
    return res.status(401).send('invalid JWT');
  }
};
