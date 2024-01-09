import { Link } from 'react-router-dom';
import { DynamicButton, DynamicButtonInfo } from '../DynamicButton';
import queryString from 'query-string';
import { useEffect } from 'react';

export const KakaoLogin = () => {
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${
    import.meta.env.VITE_KAKAO_REST_API_KEY
  }&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}`;

  const query = queryString.parse(window.location.search);

  useEffect(() => {
    if (query.code) {
      query.code.toString();
    }
  }, [query.code]);

  const buttonInfoKakao: DynamicButtonInfo = {
    type: 'solid',
    text: '카카오 로그인',
    backgroundColor: 'kakao',
    color: 'black',
    height: '50px',
    backgroundImage: './kakao_icon.png',
  };

  return (
    <Link to={kakaoAuthUrl}>
      <DynamicButton info={buttonInfoKakao}></DynamicButton>
    </Link>
  );
};
