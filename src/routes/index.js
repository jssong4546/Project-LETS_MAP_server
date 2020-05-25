const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const {
  userController,
  marketController,
  reviewController,
} = require('../controller');

// * POST /signin
router.post('/signin', userController.signin.post);

// * POST /signout
router.post('/signout', userController.signout.post);

// * POST /signup
router.post('/signup', userController.signup.post);

// * GET /findAddress
router.get('/findAddress', marketController.findAddress.get);

// * GET /
router.get('/', marketController.findAddress.get);

// * GET /filteringMarket
router.get('/filteringMarket', marketController.filteringMarket.get);

// * GET /review
router.get('/review', reviewController.review.get);

// * POST /review
router.post('/review', reviewController.review.post);

// * POST /review
router.delete('/review', reviewController.review.delete);

router.put('/review', reviewController.review.put);

// app.get('/user/favorites');
// app.post('/user/favorites');

module.exports = router;
