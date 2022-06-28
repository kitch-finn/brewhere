require('dotenv').config();
const axios = require('axios');
// axios.defaults.withCredentials = true;
const { users } = require('../models');
const {
  generateAccessToken,
  generateRefreshToken,
} = require('./tokenFunctions');

module.exports = async (req, res) => {
  console.log(req);
  const response = await axios({
    method: 'POST',
    url: `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&code=${code}&client_secret=${process.env.KAKAO_CLIENT_SECRET}`,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  });

  const { access_token } = response.data;

  const kakaoUserInfo = await axios({
    method: 'GET',
    url: 'https://kapi.kakao.com/v2/user/me',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-type': 'application/x-www-form-urlencoded',
    },
  });

  const { email, profile } = kakaoUserInfo.data.kakao_account;
  const { id } = kakaoUserInfo.data;
  const [newUserInfo, created] = await users.findOrCreate({
    where: {
      kakao_id: String(id),
    },
    defaults: {
      username: `kakao_${profile.username}`,
      kakao_oauth_token: access_token,
      signup_method: 'kakao',
      kakao_id: String(id),
    },
  });

  delete newUserInfo.dataValues.password;

  const newAccessToken = generateAccessToken(newUserInfo.dataValues);
  const refreshToken = generateRefreshToken(newUserInfo.dataValues);
  if (created) {
    return res
      .cookie('refreshToken', refreshToken, {
        sameSite: 'none',
        secure: true,
        httpOnly: true,
      })
      .status(201)
      .json({ accessToken: newAccessToken, signup_method: 'kakao' });
  } else {
    return res
      .cookie('refreshToken', refreshToken, {
        sameSite: 'none',
        secure: true,
        httpOnly: true,
      })
      .status(200)
      .json({ accessToken: newAccessToken, signup_method: 'kakao' });
  }
};
