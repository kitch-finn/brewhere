const express = require('express');
const router = express.Router();
let authController = require('../controllers/kakaoLogin');

router.get('/oauth/callback/kakao', authController);
router.post('/oauth/callback/kakao', authController);

module.exports = router;
