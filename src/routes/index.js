const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { userController, marketController } = require('../controller');

// * POST /user/signin
router.post('/signin', userController.signin.post);

// * POST /user/signout
router.post('/signout', userController.signout.post);

// * POST /user/signup
router.post('/signup', userController.signup.post);

router.get('/findAddress', marketController.findAddress.get);

router.get('/', marketController.findAddress.get);

// app.get('/', findAddressController);
// app.get('/findAddress', findAddressController);
// app.get('/review');
// app.get('/user/favorites');

// app.post('/signin', signInController);
// app.post('/signup', signUpController);
// app.post('/logout', logOutController);
// app.post('/review');
// app.post('/user/favorites');

module.exports = router;
