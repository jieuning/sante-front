import { Link, useNavigate } from 'react-router-dom';
import { DynamicButton, DynamicButtonInfo } from '../DynamicButton';
import { useEffect, useState } from 'react';
import { setUser } from '../../utils/WebStorageControl';
import queryString from 'query-string';
import axios from 'axios';
interface KakaoUserData {
  token: string;
  age: string;
  email: string;
  birthyear: number;
  gender: string;
}

interface KakaoAuthData {
  grantType: string;
  clientId: string;
  redirectUri: string;
  code: string;
}

export const KakaoLogin = () => {
  const initialToken: string = localStorage.getItem('token') || '';
  const [token, setToken] = useState<string>(initialToken);
  const navigate = useNavigate();

  const URL: string = `${import.meta.env.VITE_API_URL}/auth`;
  const kakaoURL: string = 'https://kauth.kakao.com/oauth';

  // 인가 코드 받기 위한 url
  const kakaoAuthUrl = `${kakaoURL}/authorize?response_type=code&client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY
    }&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}`;

  // 쿼리스트링으로 코드 값 가져오기
  const query = queryString.parse(window.location.search);
  const code: string | undefined = query.code?.toString();

  useEffect(() => {
    if (code) {
      getToken(code);
    }
  }, [code]);

  const getToken = async (code: string) => {
    try {
      const data: KakaoAuthData = {
        grantType: 'authorization_code',
        clientId: import.meta.env.VITE_KAKAO_REST_API_KEY,
        redirectUri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
        code: code,
      };

      // 1. kakao에서 access token 받기
      const tokenRes = await axios.post(
        `${kakaoURL}/token?grant_type=${data.grantType}&client_id=${data.clientId}&redirect_uri=${data.redirectUri}&code=${data.code}`,
        {
          header: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        }
      );

      const ACCESS_TOKEN: string = tokenRes.data.access_token;

      // 2. 카카오 서버에서 유저 정보 가져오기
      const kakaoUserInfo = await axios.get(
        'https://kapi.kakao.com/v2/user/me',
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );

      const kakaoUserData: KakaoUserData = kakaoUserInfo.data.kakao_account;

      // 3. sante 서버로 유저 정보 보내기
      await axios.post(`${URL}/kakao`, {
        email: kakaoUserData.email,
        password: kakaoUserData.email,
        age: kakaoUserData.birthyear,
        gender: kakaoUserData.gender,
      });

      // 4. sante 서버에서 유저 데이터 및 jwt 받아오기
      const user = await axios.post(`${URL}/kakao`, {
        email: kakaoUserData.email,
      });

      // 서버에서 받아온 유저 데이터
      const userData = {
        token: user.data.token,
        email: user.data.email,
        age: user.data.age,
        gender: user.data.gender,
      };

      // 로컬스토리지에 유저 데이터 저장
      setUser(userData.token, userData.email, userData.gender, userData.age);

      navigate('/main');
    } catch (error) {
      console.log(error);
      alert(`로그인 중 예기치 못한 에러가 발생했습니다.`);
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
    backgroundImage: 'src/assets/kakao_icon.png',
    onClick: () => handleTokenChange(token),
  };

  return (
    <Link to={kakaoAuthUrl}>
      <DynamicButton info={buttonInfoKakao} />
    </Link>
  );
};
