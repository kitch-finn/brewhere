import { useState, useEffect } from 'react';
import axios from 'axios';

import ConfirmModal from '../Modal/ConfirmModal';
// import Loading from '../../utils/LoadingIndicator';

const KakaoOauth = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState('');

  const modalHandler = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (code) {
      kakao(code);
    }
  }, []);

  const kakao = (code) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/oauth/callback/kakao?code=${code}`,
        { authorizationCode: `Bearer ${code}` },
        {
          headers: {
            Authorization: `Bearer ${code}`,
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.token) {
          setModalOpen(true);
          setModalMsg('카카오 로그인 되었습니다!');
          // setLoading(false);
        } else {
          setModalOpen(true);
          setModalMsg('카카오 로그인에 실패하였습니다');
          // setLoading(false);
        }
      });
  };

  return (
    <>
      {modalOpen ? (
        <ConfirmModal handleModal={modalHandler}>{modalMsg}</ConfirmModal>
      ) : null}
    </>
  );
};

export default KakaoOauth;
