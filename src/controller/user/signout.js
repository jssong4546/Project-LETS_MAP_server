module.exports = {
  post: (req, res) => {
    let token = req.headers.authorization;
    if (token) {
      req.headers.authorization = '';
      res.status(200).send('Log Out');
    } else {
      res.status(204).send('already delete token log out');
    }
  },
};
