import { Link, useNavigate } from 'react-router-dom';
import { DynamicButton, DynamicButtonInfo } from '../DynamicButton';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const KakaoLogin = () => {
  const initialToken = localStorage.getItem('token') || '';
  const [token, setToken] = useState<string>(initialToken);
  const navigate = useNavigate();

  // 인가 코드 받기 위한 url
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${
    import.meta.env.VITE_KAKAO_REST_API_KEY
  }&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}`;

  // 쿼리스트링으로 코드 값 가져오기
  const query = queryString.parse(window.location.search);
  const code = query.code?.toString();

  useEffect(() => {
    if (code) {
      getToken(code);
    }
  }, [code]);

  const getToken = async (code: string) => {
    try {
      const data = {
        grantType: 'authorization_code',
        clientId: import.meta.env.VITE_KAKAO_REST_API_KEY,
        redirectUri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
        code: code,
      };

      // 1. kakao에서 access token 받기
      const tokenRes = await axios.post(
        `https://kauth.kakao.com/oauth/token?grant_type=${data.grantType}&client_id=${data.clientId}&redirect_uri=${data.redirectUri}&code=${data.code}`,
        {
          header: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        }
      );

      const ACCESS_TOKEN: string = tokenRes.data.access_token;

      // 2. 카카오 서버에서 유저 정보 가져오기
      const userInfo = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });

      const userData = userInfo.data.kakao_account;

      // 3. sante 서버로 유저 정보 보내기
      await axios.post('http://localhost:3000/auth/kakao', {
        email: userData.email,
        password: userData.email,
        age: userData.birthyear,
        gender: userData.gender,
      });

      // 4. sante 서버에서 jwt 받아오기
      const jwToken = await axios.post('http://localhost:3000/auth/kakao', {
        email: userData.email,
      });

      // 로컬스토리지에 jwt 저장
      localStorage.setItem('token', jwToken.data.token);
      navigate('/main');
    } catch (error) {
      console.log(error);
    }
  };

  // 버튼 클릭시 로컬스토리지 토큰 값 변경
  const handleTokenChange = (newToken: string) => {
    setToken(newToken);
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
    <Link to={kakaoAuthUrl} onClick={() => handleTokenChange(token)}>
      <DynamicButton info={buttonInfoKakao} />
    </Link>
  );
};
