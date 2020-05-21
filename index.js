const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const verifyToken = require('./middleware/verifyToken');

const {
  signInController,
  signUpController,
  logOutController,
  findAddressController,
} = require('./controller'); //컨트롤러 메소드 변수를 넣어야 함

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

//해당 url에 해당하는 컨트롤러 메소드 변수를 각 url마다 넣어야 함
app.get('/', findAddressController);
app.get('/findAddress', findAddressController);
app.get('/review');
app.get('/user/favorites');

app.post('/signin', signInController);
app.post('/signup', signUpController);
app.post('/logout', logOutController);
app.post('/review');
app.post('/user/favorites');

app.listen(port, () => {
  console.log(`server listen on ${port}`);
});
