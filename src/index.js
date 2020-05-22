const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./routes/index');

const app = express();

const port = 4000;

app.use(morgan());

app.use(
  session({
    secret: 'LETS_MAP',
    resave: false,
    saveUninitialized: true,
  }),
);

app.use(bodyParser.json());

app.use(cors());

app.use('/', router);

app.listen(port, () => {
  console.log(`server listen on ${port}`);
});
