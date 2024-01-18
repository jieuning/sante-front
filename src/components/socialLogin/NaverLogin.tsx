import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import { DynamicButton, DynamicButtonInfo } from '../DynamicButton';

const NaverLogin = () => {
  const naverRef = useRef();
  const { naver } = window;

  const NAVER_CLIENT_ID = import.meta.env.REACT_APP_CLIENT_ID;
  const NAVER_CALLBACK_URL = import.meta.env.REACT_APP_CALLBACK_URL;

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      callbackUrl: NAVER_CALLBACK_URL,
      isPopup: false,
      loginButton: { color: 'green', type: 3, height: 58 },
      callbackHandle: true,
    });
    naverLogin.init();
  };

  const userAccessToken = () => {
    window.location.href.includes('access_token') && getToken();
  };

  const getToken = () => {
    const token = window.location.href.split('=')[1].split('&')[0];
    // 토큰 활용 로직 추가
  };

  useEffect(() => {
    initializeNaverLogin();
    userAccessToken();
  }, []);


  const handleNaverLogin = () => {
    naverRef.current.children[0].click();
  };

  const buttonInfoNaver: DynamicButtonInfo = {
    type: 'solid',
    text: '네이버 로그인',
    backgroundColor: 'naver',
    color: 'white',
    height: '50px',
    backgroundImage: './naver_icon.png',
    onClick: handleNaverLogin,
  };

  return (
    <>
      <NaverIdLogin ref={naverRef} id="naverIdLogin" />
      <DynamicButton info={buttonInfoNaver} />
    </>
  );
};

export default NaverLogin;

const NaverIdLogin = styled.div`
  display: none;
`;
