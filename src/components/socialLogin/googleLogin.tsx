import { useEffect } from 'react';
import { DynamicButton, DynamicButtonInfo } from '../DynamicButton';
import axios from 'axios';
import queryString from 'query-string';

const navigate = (url: string) => {
  window.location.href = url;
};

const login = async () => {
  try {
    const response = await axios.post('http://localhost:3000/google/login');
    const data = response.data;
    navigate(data.url);
  } catch (error) {
    console.error('에러 발생:', error);
  }
};

const buttonInfoGoogleLogin: DynamicButtonInfo = {
  type: 'solid',
  text: '구글 로그인',
  backgroundColor: 'white',
  color: 'black',
  height: '50px',
  backgroundImage: './google-color-icon.svg',
  onClick: () => {
    login();
    console.log('hi');
  },
};

const GoogleLogin = () => {
  const query = queryString.parse(window.location.search);
  const code = query?.code?.toString() || '';
  console.log('this is my code', code);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.post(
          'http://localhost:3000/google/login/token',
          { code: code }
        );
        const { jwToken } = response.data;

        if (jwToken) {
          navigate('/main');
          localStorage.setItem('token', jwToken);
        }
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchToken();
  }, [code]);

  return (
    <>
      <DynamicButton info={buttonInfoGoogleLogin}></DynamicButton>
    </>
  );
};

export default GoogleLogin;
