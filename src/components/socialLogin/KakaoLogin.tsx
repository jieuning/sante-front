import { Link } from 'react-router-dom';
import { DynamicButton, DynamicButtonInfo } from '../DynamicButton';
import queryString from 'query-string';
import { useEffect } from 'react';
import axios from 'axios';

export const KakaoLogin = () => {
  // 인가 코드 받기 위한 url
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${
    import.meta.env.VITE_KAKAO_REST_API_KEY
  }&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}`;

  // 쿼리스트링 코드 값 가져오기
  const query = queryString.parse(window.location.search);
  const code = query.code?.toString();

  useEffect(() => {
    if (code) {
      getKakaoToken(code);
    }
  }, [code]);

  const getKakaoToken = async (code: string) => {
    try {
      const data = {
        grantType: 'authorization_code',
        clientId: import.meta.env.VITE_KAKAO_REST_API_KEY,
        redirectUri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
        code: code,
      };

      // kakao에서 access token 받기
      const res = await axios.post(
        `https://kauth.kakao.com/oauth/token?grant_type=${data.grantType}&client_id=${data.clientId}&redirect_uri=${data.redirectUri}&code=${data.code}`,
        {
          header: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        }
      );

      // access token
      const token: string = res.data.access_token;
      console.log(token);

      // // 서버로 token 보내기
      const sendToken = await axios.post(
        'http://localhost:3000/auth/kakao',
        token
      );

      if (token) {
        return sendToken;
      }
    } catch (error) {
      console.log(error);
    }
  };

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
