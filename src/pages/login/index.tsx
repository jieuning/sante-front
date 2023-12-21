import { useState } from 'react';
import Header from '../../components/Header';
import styled from 'styled-components';
import Input from '../../components/Input';
import {
  DynamicButton,
  DynamicButtonInfo,
} from '../../components/DynamicButton';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
  };

  const handleLogin = () => {
    // 로그인 버튼 클릭 시 실행되는 로직을 추가하세요.
    console.log('로그인 버튼이 클릭되었습니다.');
    // 여기에 실제 로그인 로직을 구현하세요.
  };

  const buttonInfoLogin: DynamicButtonInfo = {
    type: 'solid',
    size: 'medium',
    text: '로그인',
    fontWeight: 'bold',
    margin: '10px',
    onClick: handleLogin,
  };

  const buttonInfoSignUp: DynamicButtonInfo = {
    type: 'solid',
    size: 'medium',
    text: '회원가입',
    fontWeight: 'bold',
    margin: '10px',
    onClick: handleLogin,
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
          height="40px"
          value={email}
          onChange={handleEmailChange}
          errorMessage={'유효성 검사 멘트'}
        />
        <Input
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요. 영문 소문자, 숫자, 특수문자를 포함한 8자리 이상 포함해야 합니다."
          width="400px"
          height="40px"
          value={password}
          onChange={handlePasswordChange}
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
  margin-top: 50px;
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
