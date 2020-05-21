const express = require('express');
const bodyParser = require('body-parser');

const { users } = require('./models');

const app = express();
const port = 3001;

app.get('/', (req, res) => {
  users
    .findOne({
      where: {
        id: 0,
      },
    })
    .then((result) => {
      if (result) {
        result.update({
          visits: result.visits + 1,
        });
        res.redirect(result.url);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`),
);

module.exports = app;
