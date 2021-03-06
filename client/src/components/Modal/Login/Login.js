import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../Landing/img/logo_x05_square.png';
import styled from 'styled-components';
import SignupModal from '../Signup/Signup';
import ConfirmModal from '../ConfirmModal';

import './Login.css';

const axios = require('axios');

export const ModalContainer = styled.div`
  text-align: center;
  width: 100%;
  height: 100%;
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
`;

export const ModalBtn = styled.button`
  text-decoration: none;
  border: none;
  padding: 20px;
  color: black;
  cursor: pointer;
`;

export const ModalView = styled.div.attrs((props) => ({
  role: 'dialog',
}))`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 35rem;
  height: 40rem;
  border-radius: 1rem;
  position: relative;
`;

function Login({ setUserinfo }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loginConfirmOpen, setLoginConfirmOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    userEmail: '',
    password: '',
  });
  const [userinfo, setUserinfos] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  const isAuthenticated = () => {
    axios
      .get('http://localhost:8080/users/auth', {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setIsLogin(true);
        setUserinfo(res);
      });
  };

  const handleResponseSuccess = () => {
    setIsLogin(true);
    isAuthenticated();
  };

  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  const openModalHandler = () => {
    setModalIsOpen(!modalIsOpen);
  };

  // ????????? ????????? ??????

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code`;

  const onClickSubmit = () => {
    const { userEmail, password } = loginInfo;
    if (!userEmail || !password) {
      setErrorMessage('???????????? ??????????????? ???????????????');
      return;
    }
    axios
      .post(
        'http://localhost:8080/users/login',
        { userEmail, password },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )
      .then((res) => {
        handleResponseSuccess();
        openModalHandler();
        setLoginConfirmOpen(true);
        setUserinfos(userEmail, password);
      });
  };

  const handleLogout = () => {
    axios
      .get('http://localhost:8080/users/logout', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        setUserinfos(null);
        setLogoutConfirmOpen(true);
        setIsLogin(false);
      })
      .catch((err) => {
        alert('????????? ???????????????');
        console.log(err);
      });
  };

  return (
    <>
      {isLogin ? (
        <button onClick={handleLogout}>????????????</button>
      ) : (
        <ModalBtn onClick={openModalHandler}>?????????</ModalBtn>
      )}

      {modalIsOpen ? (
        <ModalBackdrop onClick={openModalHandler}>
          <ModalView
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <div className='close-btn' onClick={openModalHandler}>
              &times;
            </div>

            <div className='desc'>
              <img src={logo} alt='logo' className='modal-login-logo' />
            </div>
            <div className='desc input-title'>?????????</div>
            <input
              type='text'
              className='input-login'
              placeholder='example@kakao.com'
              onChange={handleInputValue('userEmail')}
            />
            <div className='desc input-title'>????????????</div>
            <input
              type='password'
              className='input-login'
              placeholder='??????????????? ??????????????????'
              onChange={handleInputValue('password')}
            />
            <div>{errorMessage}</div>
            <button
              className='desc login-btn'
              type='submit'
              onClick={onClickSubmit}
            >
              ?????????
            </button>
            <a href={KAKAO_AUTH_URL}>
              <div className='kakao_btn'></div>
            </a>
            <br />
            <div className='signup-text'>
              ???????????? ??????????????? ?
              <span className='signup-link'>
                <SignupModal />
              </span>
            </div>
          </ModalView>
        </ModalBackdrop>
      ) : null}
      {loginConfirmOpen ? (
        <ConfirmModal>????????? ???????????????!</ConfirmModal>
      ) : null}
      {logoutConfirmOpen ? (
        <ConfirmModal>???????????? ???????????????!</ConfirmModal>
      ) : null}
    </>
  );
}

export default Login;
