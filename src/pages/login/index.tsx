import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import styled from 'styled-components';
import Input from '../../components/Input';
import {
  DynamicButton,
  DynamicButtonInfo,
} from '../../components/DynamicButton';
import useUserLogin from './hooks/useUserLogin';
import { User } from '../../types/user';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setUser } from '../../utils/WebStorageControl';

const URL = 'http://kdt-sw-7-team04.elicecoding.com/api/user';

const Login = () => {
  const [email, setEmail] = useState<string | number>('');
  const [password, setPassword] = useState<string | number>('');

  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [pwValid, setPwValid] = useState<boolean>(false);

  const { onLoginButton } = useUserLogin();

  let navigate = useNavigate();

  useEffect(() => {
    console.log('Email:', email);
    const emailRegex = /^\S+@\S+.\S+$/;
    if (emailRegex.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  }, [email]);

  useEffect(() => {
    console.log('Password:', password);
    const pwRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (pwRegex.test(password)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  }, [password]);

  const handleEmailChange = (value: string | number) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string | number) => {
    setPassword(value);
  };

  const handleLoginButton = () => {
    axios
      .post(`${URL}/check`, {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.status === 200) {
          setUser(email.toString(), password.toString());
          navigate('/main');
        } else if (res.status === 404) {
          alert('아이디 또는 비밀번호를 확인해주세요.');
        }
        console.log('status', res.data.message);
        return res.status;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRegisterButton = () => {
    navigate('/register');
  };

  const buttonInfoLogin: DynamicButtonInfo = {
    type: 'solid',
    size: 'medium',
    text: '로그인',
    fontWeight: 'bold',
    onClick: handleLoginButton,
  };

  const buttonInfoSignUp: DynamicButtonInfo = {
    type: 'solid',
    size: 'medium',
    text: '회원가입',
    fontWeight: 'bold',
    onClick: handleRegisterButton,
  };

  return (
    <>
      <StyledLogin>
        <Header />
        <StyledTitle>로그인</StyledTitle>
        <Input
          type="text"
          name="email"
          placeholder="이메일을 입력해주세요."
          width="400px"
          height="50px"
          value={email}
          onChange={handleEmailChange}
          errorMessage={
            !emailValid && email.length > 0
              ? '올바른 이메일 형식으로 입력해주세요.'
              : undefined
          }
        />
        <Input
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요."
          width="400px"
          height="50px"
          value={password}
          onChange={handlePasswordChange}
          errorMessage={
            !pwValid && password.length > 0
              ? '8자리 이상 영문, 숫자, 특수문자를 포함해야 합니다.'
              : undefined
          }
        />
        <StyledButton>
          <DynamicButton info={buttonInfoLogin} />
          <DynamicButton info={buttonInfoSignUp} />
        </StyledButton>
      </StyledLogin>
    </>
  );
};

// 나머지 코드는 동일합니다.
const StyledButton = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 40px;
`;

const StyledTitle = styled.p`
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  margin-top: 70px;
  margin-bottom: 20px;
  background-color: var(--white-background-color);
`;

const StyledLogin = styled.div`
  background-color: var(--white-background-color);
`;

export default Login;
