import React, { useState } from 'react';
import logo from '../../Landing/img/logo_x05_square.png'
import styled from 'styled-components';
import SignupMoadl from '../Signup/Signup'
import './Login.css'


export const ModalContainer = styled.div`
  // TODO : Modal을 구현하는데 전체적으로 필요한 CSS를 구현합니다.
  text-align: center;
  width: 100%;
  height: 100%;
`;

export const ModalBackdrop = styled.div`
  // TODO : Modal이 떴을 때의 배경을 깔아주는 CSS를 구현합니다.
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
  z-index: 999; // 레이어의 맨 위에 모달 창이 나와야 하므로 가장 큰 수(999)로 설정
`;

export const ModalBtn = styled.button`
  background-color: #4000c7;
  text-decoration: none;
  border: none;
  padding: 20px;
  color: white;
  border-radius: 30px;
  cursor: grab;
`;

export const ModalView = styled.div.attrs((props) => ({
  // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있습니다.
  role: "dialog",
}))`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 600px;
  height: 600px;
  border-radius: 1rem;
  position: relative;
  > div.close-btn {
    position: absolute;
    top: 2px;
    right: 7px;
    cursor: pointer; // 마우스포인터를 위에 올리면 커서가 손 모양으로 변하게
    > div.desc {
      color: violet;
      margin-top: 25px;
    }
  }
`;

function Login() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModalHandler = () => {
    setModalIsOpen(!modalIsOpen);
  };

  // 모달 창이 열렸을 때, 스크롤 막기
  // if (modalIsOpen) {
  //   document.body.style.overflow = "hidden";
  // } else {
  //   document.body.style.overflow = "unset";
  // }

  // 카카오 로그인 관련
  const CLIENT_ID = "a879c6361070a85ff535c43fddfd2bba";
  const REDIRECT_URI = "http://localhost:3000/oauth/callback/kakao";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <>
      <ModalContainer onClick={openModalHandler}>
        <ModalBtn onClick={openModalHandler}>
          {/* 로그인 여부에 따른 로그인/로그아웃 교차 표출 필요 */}
          로그인
        </ModalBtn>


        { modalIsOpen ? <ModalBackdrop onClick={openModalHandler}>
                    <ModalView onClick={(event) => {
                      event.stopPropagation()
                    }
                  }>
                      <div className="close-btn" onClick={openModalHandler}>
                        &times;
                      </div>

                      <div className="desc">
                        <img src={logo} alt="modal-login-logo" className="modal-login-logo"/>
                      </div>
                      <div className="desc">이메일</div>
                      <input type="text" className='input-login' placeholder="example@example.com" />
                      <div className="desc">비밀번호</div>
                      <input type="password" className='input-login' placeholder="8자 이상의 비밀번호를 입력해주세요" />
                      <button className="desc login-btn">로그인</button>
                      <a href={KAKAO_AUTH_URL}>
                        <div 
                            className="kakao_btn"
                            >
                        </div>
                      </a>
                      <br />
                      <div className="signup-text">아이디가 없으신가요? <span className="signup-link"><SignupMoadl /></span></div>
                    </ModalView>
                  </ModalBackdrop> 
                  : null}
      </ModalContainer>
    </>
  );
}

export default Login;
